/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Injectable} from '@angular/core';
import {Observable, of, switchMap} from 'rxjs';
import {ImagenRequest, VeoRequest} from '../../models/search.model';
import {LlmService} from '../llm/llm.service';
import {BrandGuidelineService} from '../brand-guideline/brand-guideline.service';
import {buildImageRewritePrompt} from '../../prompts/image-rewrite.prompt';
import {buildVideoRewritePrompt} from '../../prompts/video-rewrite.prompt';
import {buildGeminiI2iPrompt} from '../../prompts/gemini-i2i.prompt';

const GEMINI_I2I_MODELS = [
  'gemini-2.5-flash-image-preview',
  'gemini-3-pro-image-preview',
];

/**
 * Orchestrates the full prompt composition pipeline on the frontend.
 * Mirrors the backend's `enhance_prompt_from_dto` logic from gemini_service.py.
 */
@Injectable({
  providedIn: 'root',
})
export class PromptComposerService {
  constructor(
    private llmService: LlmService,
    private brandGuidelineService: BrandGuidelineService,
  ) {}

  /**
   * Enhances an image generation prompt.
   * Handles Gemini i2i, brand guidelines injection, and LLM rewrite.
   */
  enhanceImagePrompt(
    request: ImagenRequest,
    workspaceId: string | null,
  ): Observable<string> {
    // --- Gemini i2i check ---
    const hasSourceImages =
      (request.sourceAssetIds && request.sourceAssetIds.length > 0) ||
      (request.sourceMediaItems && request.sourceMediaItems.length > 0);

    if (
      GEMINI_I2I_MODELS.includes(request.generationModel) &&
      hasSourceImages
    ) {
      return of(buildGeminiI2iPrompt(request.prompt));
    }

    // --- Brand guidelines injection + LLM rewrite ---
    return this.injectBrandGuidelines(
      request.prompt,
      request.useBrandGuidelines,
      workspaceId,
    ).pipe(
      switchMap(promptWithGuidelines => {
        const composedInput = this.convertImageDtoToString({
          ...request,
          prompt: promptWithGuidelines,
        });
        const fullPrompt = buildImageRewritePrompt(composedInput);
        return this.llmService.generateContent(
          fullPrompt,
          undefined,
          'application/json',
        );
      }),
    );
  }

  /**
   * Enhances a video generation prompt.
   * Handles brand guidelines injection and LLM rewrite.
   */
  enhanceVideoPrompt(
    request: VeoRequest,
    workspaceId: string | null,
  ): Observable<string> {
    return this.injectBrandGuidelines(
      request.prompt,
      request.useBrandGuidelines,
      workspaceId,
    ).pipe(
      switchMap(promptWithGuidelines => {
        const composedInput = this.convertVideoDtoToString({
          ...request,
          prompt: promptWithGuidelines,
        });
        const fullPrompt = buildVideoRewritePrompt(composedInput);
        return this.llmService.generateContent(
          fullPrompt,
          undefined,
          'application/json',
        );
      }),
    );
  }

  /**
   * Prepends brand guidelines to the prompt if enabled and available.
   * Mirrors the backend's brand guideline injection in enhance_prompt_from_dto.
   */
  private injectBrandGuidelines(
    prompt: string,
    useBrandGuidelines: boolean,
    workspaceId: string | null,
  ): Observable<string> {
    if (!useBrandGuidelines || !workspaceId) {
      return of(prompt);
    }

    return this.brandGuidelineService
      .getBrandGuidelineForWorkspace(Number(workspaceId))
      .pipe(
        switchMap(guideline => {
          if (!guideline) {
            return of(prompt);
          }

          const prefixParts: string[] = [
            'Based on the following brand guidelines, enhance the user\'s prompt.',
          ];
          if (guideline.visualStyleSummary) {
            prefixParts.push(
              `**Visual Style:** ${guideline.visualStyleSummary}`,
            );
          }
          if (guideline.toneOfVoiceSummary) {
            prefixParts.push(
              `**Tone of Voice:** ${guideline.toneOfVoiceSummary}`,
            );
          }
          prefixParts.push('\n---');
          const prefix = prefixParts.join('\n') + '\n\n';
          return of(prefix + prompt);
        }),
      );
  }

  /**
   * Converts an ImagenRequest to a formatted string for prompting.
   * Mirrors the backend's _convert_dto_to_string method.
   */
  private convertImageDtoToString(request: ImagenRequest): string {
    const lines: string[] = [request.prompt];

    if (request.generationModel) {
      lines.push(`- Generation Model: ${request.generationModel}`);
    }
    if (request.aspectRatio) {
      lines.push(`- Aspect Ratio: ${request.aspectRatio}`);
    }
    if (request.style) {
      lines.push(`- Style: ${request.style}`);
    } else {
      lines.push('- Style: ');
    }
    if (request.lighting) {
      lines.push(`- Lighting: ${request.lighting}`);
    } else {
      lines.push('- Lighting: ');
    }
    if (request.colorAndTone) {
      lines.push(`- Color And Tone: ${request.colorAndTone}`);
    } else {
      lines.push('- Color And Tone: ');
    }
    if (request.composition) {
      lines.push(`- Composition: ${request.composition}`);
    } else {
      lines.push('- Composition: ');
    }
    if (request.negativePrompt) {
      lines.push(`- Negative Prompt: ${request.negativePrompt}`);
    }

    return lines.filter(Boolean).join('\n');
  }

  /**
   * Converts a VeoRequest to a formatted string for prompting.
   * Mirrors the backend's _convert_dto_to_string method.
   */
  private convertVideoDtoToString(request: VeoRequest): string {
    const lines: string[] = [request.prompt];

    if (request.generationModel) {
      lines.push(`- Generation Model: ${request.generationModel}`);
    }
    if (request.aspectRatio) {
      lines.push(`- Aspect Ratio: ${request.aspectRatio}`);
    }
    if (request.style) {
      lines.push(`- Style: ${request.style}`);
    } else {
      lines.push('- Style: ');
    }
    if (request.lighting) {
      lines.push(`- Lighting: ${request.lighting}`);
    } else {
      lines.push('- Lighting: ');
    }
    if (request.colorAndTone) {
      lines.push(`- Color And Tone: ${request.colorAndTone}`);
    } else {
      lines.push('- Color And Tone: ');
    }
    if (request.composition) {
      lines.push(`- Composition: ${request.composition}`);
    } else {
      lines.push('- Composition: ');
    }
    if (request.negativePrompt) {
      lines.push(`- Negative Prompt: ${request.negativePrompt}`);
    }

    return lines.filter(Boolean).join('\n');
  }
}
