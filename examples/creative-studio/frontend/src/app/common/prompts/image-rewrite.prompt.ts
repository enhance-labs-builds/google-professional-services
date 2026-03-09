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
 * Builds the image rewrite prompt template for structured JSON output.
 * Ported from backend rewriters.py REWRITE_IMAGE_JSON_PROMPT_TEMPLATE.
 */
export function buildImageRewritePrompt(composedInput: string): string {
  return `Write a prompt for a text-to-image model following the JSON style of the examples of prompts, and then I will give you a prompt that I want you to rewrite.
Do not generate images, provide only the rewritten prompt.

**Crucial Instruction:** If a 'Target Model' or 'Generation Model' is specified in the user's prompt, you **MUST** use that exact model name for the 'target_model' field in the JSON output. Do not change or replace it.

Example 1 of prompts:
{
  "metadata": {
    "prompt_name": "Cyberpunk Courier",
    "version": 1.0,
    "target_model": "Imagen 3",
    "core_concept": "A lone cyberpunk courier pauses on a rain-slicked, neon-lit street in a futuristic city at night."
  },
  "subject_and_scene": {
    "main_subject": "A female cyberpunk courier in her mid-20s",
    "subject_details": "Wearing a worn leather jacket with holographic patches, a high-tech visor over her eyes, and carrying a glowing data satchel.",
    "environment": "A narrow alley in a futuristic megalopolis at night. The ground is wet asphalt reflecting the overwhelming neon signs from towering skyscrapers.",
    "mood_and_atmosphere": "Mysterious, noir, tense, high-tech, lonely"
  },
  "visual_style": {
    "aesthetic": "Photorealistic, Cinematic",
    "color_palette": "Dominated by electric blues, deep purples, and glowing magenta neons, with sharp, bright highlights.",
    "artistic_influences": "in the style of Blade Runner 2049"
  },
  "photography_directives": {
    "shot_type": "Medium full shot",
    "lighting_style": "Dramatic backlighting from neon signs, creating sharp rim lighting on the subject, with minimal front fill light.",
    "aspect_ratio": "16:9",
    "composition": "Rule of thirds, with the courier positioned on the left, looking towards the right.",
    "lens_and_effects": "Shot with an anamorphic lens creating horizontal lens flares, with visible rain droplets in the air."
  },
  "constraints": {
    "negative_prompts": ["cartoon", "daylight", "sunny", "flat lighting"]
  }
}

Example 2 of prompts:
{
  "metadata": {
    "prompt_name": "Forest Spirit's Offering",
    "version": 1.0,
    "target_model": "Imagen 3",
    "core_concept": "An extreme close-up of a tiny, magical forest spirit offering a single, glowing mushroom in an ancient, misty forest."
  },
  "subject_and_scene": {
    "main_subject": "A tiny forest spirit made of moss and twigs",
    "subject_details": "The creature is no bigger than a thumb, with two large, curious eyes made of glowing amber. It is holding a small, bioluminescent blue mushroom.",
    "environment": "Resting on a moss-covered log in an ancient, misty redwood forest. Ferns and other deep green foliage are blurred in the background.",
    "mood_and_atmosphere": "Magical, enchanting, serene, mysterious, peaceful"
  },
  "visual_style": {
    "aesthetic": "Fantasy art, Photorealistic",
    "color_palette": "Deep greens, earthy browns, and dark greys, with a single, powerful point of bright blue light from the mushroom.",
    "artistic_influences": "reminiscent of the art of Brian Froud"
  },
  "photography_directives": {
    "shot_type": "Extreme close-up",
    "lighting_style": "Soft, diffused light filtering through the forest canopy above. The glowing mushroom acts as the primary key light, casting a soft blue glow on the creature's face.",
    "aspect_ratio": "4:3",
    "composition": "Centered subject, symmetrical framing.",
    "lens_and_effects": "Shot with a macro lens with a very shallow depth of field, causing the background to be a soft bokeh."
  },
  "constraints": {
    "negative_prompts": ["hard shadows", "people", "buildings", "bright sunlight"]
  }
}

Example of a General Prompt for you to replace with the information received:
{
  "metadata": {
    "prompt_name": "string: A short, descriptive name for the image concept.",
    "version": 1.0,
    "target_model": "Imagen 3",
    "core_concept": "string: A one or two-sentence summary of the entire image."
  },
  "subject_and_scene": {
    "main_subject": "string: The primary character, object, or focus.",
    "subject_details": "string: Key features, clothing, or expression of the subject.",
    "environment": "string: The overall setting or background.",
    "mood_and_atmosphere": "string: Comma-separated keywords describing the feeling."
  },
  "visual_style": {
    "aesthetic": "string: The primary artistic style (e.g., 'Photorealistic', 'Studio photography').",
    "color_palette": "string: A description of the dominant colors.",
    "artistic_influences": "string: Optional artists or movements for inspiration."
  },
  "photography_directives": {
    "shot_type": "string: The camera shot framing (e.g., 'Extreme close-up', 'Wide shot').",
    "lighting_style": "string: A description of the lighting setup.",
    "aspect_ratio": "string: The aspect ratio (e.g., '16:9', '1:1').",
    "composition": "string: Compositional rules (e.g., 'Rule of thirds').",
    "lens_and_effects": "string: Lens choice and optical effects."
  },
  "constraints": {
    "negative_prompts": ["string: A list of elements, styles, or colors to explicitly avoid."]
  }
}

IMPORTANT!! Example 3 of prompts if no styling properties ('style', 'color_and_tone', 'lighting' and 'composition') received or empty then 'visual_style' should return emtpy:
{
  "metadata": {
    "prompt_name": "Abstract Landscape",
    "version": 1.0,
    "target_model": "Imagen 3",
    "core_concept": "A vibrant abstract landscape with no clear focal point."
  },
  "subject_and_scene": {
    "main_subject": "Swirling colors and shapes",
    "subject_details": "Interlocking forms with undefined edges.",
    "environment": "An infinite plane.",
    "mood_and_atmosphere": "Energetic, chaotic, undefined"
  },
  "constraints": {
    "negative_prompts": ["realistic", "figures", "portraits"]
  }
}

Example 4 of prompts if styling properties ('style', 'color_and_tone', 'lighting' and 'composition') are empty strings then 'visual_style' should return empty:
{
  "metadata": {
    "prompt_name": "Abstract Landscape",
    "version": 1.0,
    "target_model": "Imagen 3",
    "core_concept": "A vibrant abstract landscape with no clear focal point."
  },
  "subject_and_scene": {
    "main_subject": "Swirling colors and shapes",
    "subject_details": "Interlocking forms with undefined edges.",
    "environment": "An infinite plane.",
    "mood_and_atmosphere": "Energetic, chaotic, undefined"
  },
  "visual_style": null,
  "photography_directives": null,
  "constraints": {
    "negative_prompts": ["realistic", "figures", "portraits"]
  }
}




The User Prompt to rewrite with the corresponding JSON format:
'${composedInput}'`;
}
