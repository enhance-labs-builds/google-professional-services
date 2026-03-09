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

/**
 * Builds the Gemini image-to-image instruction prompt.
 * Ported from gemini_service.py enhance_prompt_from_dto() Gemini i2i block.
 *
 * This prompt is sent directly to Gemini models (Flash / Pro) when reference
 * images are present. It is NOT rewritten through the JSON pipeline.
 */
export function buildGeminiI2iPrompt(userRequest: string): string {
  return (
    '**Objective:** Perform a targeted edit on the source image based on the user\'s request.\n' +
    '**Guiding Principle:** Your primary goal is to follow the user\'s instructions precisely. Preserve all aspects of the original image (subject identity, background, lighting, composition) unless the user\'s request explicitly requires a change.\n\n' +
    '**Execution Flow:** Analyze the user\'s request and match it to one of the following scenarios. If no scenario fits perfectly, use the \'General Instruction\' as a fallback.\n\n' +
    '--- Scenarios ---\n\n' +
    '**1. Garment/Accessory Edit** (e.g., \'change the shirt to blue\', \'add sunglasses\')\n' +
    '   - **Action:** Isolate and modify only the specified clothing or accessory item.\n' +
    '   - **Constraint:** You **MUST NOT** change the subject\'s identity, face, pose, or the background.\n\n' +
    '**2. Background Replacement** (e.g., \'change the background to a beach\', \'put them in Paris\')\n' +
    '   - **Action:** Replace the entire background with the new scene described.\n' +
    '   - **Constraint:** You **MUST** preserve the foreground subject\'s identity, pose, and clothing. Adjust lighting on the subject only as needed to blend them realistically into the new background.\n\n' +
    '**3. Pose Adjustment** (e.g., \'make them wave\', \'change the pose to sitting\')\n' +
    '   - **Action:** Adjust the subject\'s body to the new pose.\n' +
    '   - **Constraint:** You **MUST** preserve the subject\'s identity, clothing, and the background environment.\n\n' +
    '**4. Outpainting / Zoom Out** (e.g., \'zoom out\', \'show more of the scene\', \'make it a wide-angle shot\')\n' +
    '   - **Action:** Extend the image outwards by generating new content that seamlessly matches the existing style (outpainting).\n' +
    '   - **Default:** If the user just says \'zoom out\', interpret it as \'zoom out by at least 2x\'. If they specify a different amount, follow their instruction.\n\n' +
    '**5. General Instruction (Fallback):**\n' +
    '   - **Action:** If the request does not fit the scenarios above, follow the user\'s instructions as literally as possible.\n' +
    '   - **Constraint:** Make the minimum necessary changes to fulfill the request, preserving as much of the original image as you can.\n\n' +
    '--- End of Scenarios ---\n\n' +
    `**User's Request:** ${userRequest}`
  );
}
