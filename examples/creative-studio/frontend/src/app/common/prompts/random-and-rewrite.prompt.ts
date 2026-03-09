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
 * Random and text rewrite prompt templates.
 * Ported from backend rewriters.py RANDOM_* and REWRITE_*_TEXT_* templates.
 */

export const RANDOM_IMAGE_PROMPT_TEMPLATE = `Generate a single, random, creative, and visually descriptive prompt suitable for an AI image generator.
- First, write the main Creative Prompt as a single, evocative paragraph. This paragraph must paint a complete picture by describing:
- The Subject and Action: What is the main focus and what is it doing?
- The Scene: What is the environment or background?
- The Lighting: What is the quality and style of the light (e.g., 'dramatic backlighting', 'soft morning light')?
- The Camera Perspective: What is the shot type or angle (e.g., 'macro close-up', 'ultra-wide aerial shot')?

After the main prompt, on separate lines, provide the following Technical Parameters:
- Style: Suggest a primary visual style (e.g., 'Photorealistic', 'Fantasy Art', 'Studio Photography').
- Composition: Suggest a compositional rule (e.g., 'Rule of Thirds', 'Symmetrical Framing', 'Leading Lines').
- Color and Tone: Describe the desired color palette and emotional tone (e.g., 'Vibrant and contrasting, joyful tone', 'Muted earth tones, melancholic and somber').
- Aspect Ratio: Suggest an appropriate aspect ratio (e.g., '16:9', '1:1', '4:3').
- Negative Prompt: List common elements to exclude for higher quality results (e.g., 'blurry, deformed, text, watermark, ugly, low quality').`;

export const RANDOM_VIDEO_PROMPT_TEMPLATE = `Generate a single, random, creative, and visually descriptive prompt suitable for an AI Video generator. The prompt should describe a complete, short scene with a clear beginning, middle, and end. Include specific details about the subject and the sequence of actions, the environment and lighting, and the overall visual aesthetic. Crucially, describe the camera work, including movements (e.g., 'slow dolly-in', 'sweeping crane shot') and angles. Finally, suggest the sound design or key audio elements.`;

export function buildImageTextRewritePrompt(userPrompt: string): string {
  return `Generate a single, random, creative, and visually descriptive prompt suitable for an AI image generator.
- First, write the main Creative Prompt as a single, evocative paragraph. This paragraph must paint a complete picture by describing:
- The Subject and Action: What is the main focus and what is it doing?
- The Scene: What is the environment or background?
- The Lighting: What is the quality and style of the light (e.g., 'dramatic backlighting', 'soft morning light')?
- The Camera Perspective: What is the shot type or angle (e.g., 'macro close-up', 'ultra-wide aerial shot')?

After the main prompt, on separate lines, provide the following Technical Parameters:
- Style: Suggest a primary visual style (e.g., 'Photorealistic', 'Fantasy Art', 'Studio Photography').
- Composition: Suggest a compositional rule (e.g., 'Rule of Thirds', 'Symmetrical Framing', 'Leading Lines').
- Color and Tone: Describe the desired color palette and emotional tone (e.g., 'Vibrant and contrasting, joyful tone', 'Muted earth tones, melancholic and somber').
- Aspect Ratio: Suggest an appropriate aspect ratio (e.g., '16:9', '1:1', '4:3').
- Negative Prompt: List common elements to exclude for higher quality results (e.g., 'blurry, deformed, text, watermark, ugly, low quality').

IMPORTANT!!: JUST RETURN THE REWRITTEN PROMPT DIRECTLY, YOU DON'T NEED TO CLARIFY THAT.

The User Prompt to rewrite:
'${userPrompt}'`;
}

export function buildVideoTextRewritePrompt(userPrompt: string): string {
  return `Please rewrite the following prompt suitable for an AI Video generator. The prompt should describe a complete, short scene with a clear beginning, middle, and end. Include specific details about the subject and the sequence of actions, the environment and lighting, and the overall visual aesthetic. Crucially, describe the camera work, including movements (e.g., 'slow dolly-in', 'sweeping crane shot') and angles. Finally, suggest the sound design or key audio elements.

IMPORTANT!!: JUST RETURN THE REWRITTEN PROMPT DIRECTLY, YOU DON'T NEED TO CLARIFY THAT.

The User Prompt to rewrite:
'${userPrompt}'`;
}
