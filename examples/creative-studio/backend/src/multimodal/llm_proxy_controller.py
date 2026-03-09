# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field

from src.auth.auth_guard import RoleChecker
from src.multimodal.gemini_service import GeminiService
from src.users.user_model import UserRoleEnum


class LlmGenerateContentRequest(BaseModel):
    prompt: str = Field(description="The text prompt to send to the LLM.")
    system_instruction: Optional[str] = Field(
        default=None,
        description="Optional system instruction to guide the LLM's behavior.",
    )
    response_mime_type: Optional[str] = Field(
        default=None,
        description="Optional MIME type for the response (e.g., 'application/json').",
    )


class LlmGenerateContentResponse(BaseModel):
    text: str = Field(description="The generated text from the LLM.")


router = APIRouter(
    prefix="/api/llm",
    tags=["LLM Proxy"],
    responses={404: {"description": "Not found"}},
    dependencies=[
        Depends(
            RoleChecker(
                allowed_roles=[
                    UserRoleEnum.ADMIN,
                    UserRoleEnum.USER,
                ]
            )
        )
    ],
)


@router.post(
    "/generate-content",
    response_model=LlmGenerateContentResponse,
    summary="Generic LLM proxy endpoint for text generation",
)
async def generate_content(
    request: LlmGenerateContentRequest,
    gemini_service: GeminiService = Depends(),
):
    """
    A generic proxy endpoint that forwards text generation requests to Gemini.
    This allows the frontend to call the LLM for prompt rewriting without
    exposing API keys.
    """
    try:
        prompt = request.prompt
        if request.system_instruction:
            prompt = f"{request.system_instruction}\n\n{prompt}"

        mime_type = request.response_mime_type or "text/plain"
        generated_text = gemini_service.generate_text(
            prompt=prompt,
            response_mime_type=mime_type,
        )

        return LlmGenerateContentResponse(text=generated_text)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"LLM content generation failed: {e}",
        )
