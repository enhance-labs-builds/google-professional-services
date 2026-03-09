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
 * Builds the video rewrite prompt template for structured JSON output.
 * Ported from backend rewriters.py REWRITE_VIDEO_JSON_PROMPT_TEMPLATE.
 */
export function buildVideoRewritePrompt(composedInput: string): string {
  return `Write a prompt for a text-to-video model following the JSON style of the examples of prompts, and then I will give you a prompt that I want you to rewrite.
Do not generate videos, provide only the rewritten prompt.

**Crucial Instruction:** If a 'Target Model' or 'Generation Model' is specified in the user's prompt, you **MUST** use that exact model name for the 'target_model' field in the JSON output. Do not change or replace it.

Example 1 of prompts:
{
  "metadata": {
    "prompt_name": "Cyberpunk Drone Pursuit",
    "version": 1.1,
    "target_model": "Veo",
    "core_concept": "In a rain-slicked neon metropolis, a sleek cybernetic courier on a futuristic motorcycle is pursued by aggressive security drones through crowded back alleys."
  },
  "scene_setup": {
    "environment": "A dense, futuristic city at night, drenched in rain. Towering skyscrapers are covered in holographic advertisements. The action takes place in narrow, grimy back alleys.",
    "mood": "Tense, thrilling, high-stakes, energetic, cyberpunk.",
    "key_objects": [
      "Futuristic motorcycle with glowing wheel rims",
      "Sleek, black security drones with red optical sensors",
      "A glowing data package held by the courier"
    ]
  },
  "visual_style": {
    "aesthetic": "Hyper-realistic, cinematic, Blade Runner-inspired, high contrast.",
    "color_palette": "Dominated by electric blues, neon pinks, and deep blacks, with reflections on wet asphalt.",
    "resolution_and_format": "4K, 21:9 anamorphic widescreen"
  },
  "camera_directives": {
    "overall_movement": "Fast-paced, dynamic tracking shots. Shaky-cam effect during intense moments, with quick cuts between the courier and the pursuing drones.",
    "shot_types": "Low-angle tracking shots, over-the-shoulder from the courier's perspective, close-ups on the drone's red eyes."
  },
  "timeline": [
    {
      "sequence_id": 1,
      "timestamp": "00:00-00:02",
      "action": "The motorcycle bursts out of a main street into a narrow alley, kicking up a spray of water. Two drones swoop in behind it.",
      "camera_instruction": "Wide shot to establish the chase, then quickly pan to follow the motorcycle.",
      "audio_description": "High-pitched whine of the electric motorcycle, deep hum of the drones, sound of rain and distant city sirens."
    },
    {
      "sequence_id": 2,
      "timestamp": "00:02-00:05",
      "action": "The courier weaves skillfully between pipes and dumpsters. One drone fires a warning laser shot that sizzles against a wall.",
      "camera_instruction": "Tight follow-cam behind the motorcycle. Quick cut to the drone firing.",
      "audio_description": "Scraping metal sounds, sharp 'zap' of the laser, intensified motor whines."
    },
    {
      "sequence_id": 3,
      "timestamp": "00:05-00:07",
      "action": "The courier glances back, then hits a boost, accelerating dramatically down the alley as the screen fades to black.",
      "camera_instruction": "Extreme close-up on the courier's determined face, then a rapid dolly zoom out as the bike boosts away.",
      "audio_description": "A powerful 'whoosh' sound as the boost engages, rising futuristic score, then silence."
    }
  ],
  "constraints": {
    "negative_prompts": [
      "no daylight",
      "no cars from the 21st century",
      "no slow-motion"
    ]
  },
  "final_summary_prompt": "Cinematic 4K video, cyberpunk aesthetic. In a rain-soaked, neon-lit metropolis at night, a courier on a futuristic motorcycle is chased by menacing drones through tight back alleys. The scene is tense and fast-paced, with dynamic camera work and a color palette of electric blues and pinks against deep blacks."
}

Example 2 of prompts:
{
  "metadata": {
    "prompt_name": "The Crystal Bloom",
    "version": 1.0,
    "target_model": "Veo",
    "core_concept": "In an enchanted forest at dawn, a single drop of dew falls onto a mossy rock, causing a beautiful, intricate crystal flower to grow and bloom in hyper-lapse."
  },
  "scene_setup": {
    "environment": "An ancient, mystical forest floor. Moss covers everything. Soft, ethereal light filters through the canopy.",
    "mood": "Magical, serene, wondrous, peaceful, enchanting.",
    "key_objects": [
      "A perfect, shimmering dewdrop",
      "An old, moss-covered stone",
      "The crystal flower"
    ]
  },
  "visual_style": {
    "aesthetic": "Photorealistic, macro photography, fantasy, ethereal.",
    "color_palette": "Soft greens, earthy browns, and the iridescent, glowing light of the crystal flower.",
    "resolution_and_format": "4K, 1:1 square aspect ratio"
  },
  "camera_directives": {
    "overall_movement": "Extremely slow, subtle camera push-in. The focus is entirely on the rock and the flower's growth.",
    "shot_types": "Macro shots, shallow depth of field, focus pulling."
  },
  "timeline": [
    {
      "sequence_id": 1,
      "timestamp": "00:00-00:03",
      "action": "A single dewdrop hangs from a leaf, reflecting the entire forest. It quivers and falls in beautiful slow motion.",
      "camera_instruction": "Extreme macro shot on the dewdrop. Follow it as it falls.",
      "audio_description": "A single, gentle musical note (like a harp). The soft, ambient sounds of a forest."
    },
    {
      "sequence_id": 2,
      "timestamp": "00:03-00:07",
      "action": "The dewdrop lands on the mossy rock. Upon impact, tiny, glowing crystalline structures begin to emerge and grow rapidly from the moss in a time-lapse.",
      "camera_instruction": "Camera holds steady on the rock. Focus pulls from the moss to the emerging crystals.",
      "audio_description": "A soft, magical chime sound on impact, followed by subtle, shimmering and crackling ASMR sounds of crystal growth."
    },
    {
      "sequence_id": 3,
      "timestamp": "00:07-00:10",
      "action": "The crystal structures form a complete, intricate flower that unfurls its petals. It pulses once with a soft, warm light, illuminating the immediate area.",
      "camera_instruction": "Continue the slow push-in, ending on a perfect, detailed shot of the fully bloomed crystal flower.",
      "audio_description": "A gentle, swelling orchestral score culminates as the flower blooms, then fades back to serene forest ambiance."
    }
  ],
  "constraints": {
    "negative_prompts": [
      "no animals",
      "no people",
      "no harsh lighting",
      "no fast camera movements"
    ]
  },
  "final_summary_prompt": "Photorealistic 4K macro video. In a magical forest at dawn, a single dewdrop falls onto a mossy rock, causing a beautiful, intricate crystal flower to grow and bloom in a hyper-lapse. The mood is serene and wondrous, with soft, ethereal lighting and a focus on the magical transformation."
}


Example 3 of prompts if no styling properties ('style', 'color_and_tone', 'lighting' and 'composition') received or empty then 'visual_style' should return emtpy:
{
  "metadata": {
    "prompt_name": "Simple Scene",
    "version": 1.0,
    "target_model": "Veo",
    "core_concept": "A person walking in a park."
  },
  "scene_setup": {
    "environment": "A sunny park with green grass and trees.",
    "mood": "Peaceful, calm.",
    "key_objects": [
      "A person",
      "Trees",
      "Grass"
    ]
  },
  "camera_directives": {
    "overall_movement": "Fixed shot.",
    "shot_types": "Wide shot"
  },
  "timeline": [
    {
      "sequence_id": 1,
      "timestamp": "00:00-00:05",
      "action": "A person walks from left to right.",
      "camera_instruction": "Follow the person.",
      "audio_description": "Footsteps, birds chirping."
    }
  ],
  "constraints": {
    "negative_prompts": [
      "no cars",
      "no buildings"
    ]
  },
  "final_summary_prompt": "A person walking in a sunny park."
}


Example 4 of prompts if styling properties ('style', 'color_and_tone', 'lighting' and 'composition') are empty strings then 'visual_style' should return emtpy:
{
  "metadata": {
    "prompt_name": "Simple Scene",
    "version": 1.0,
    "target_model": "Veo",
    "core_concept": "A person walking in a park."
  },
  "scene_setup": {
    "environment": "A sunny park with green grass and trees.",
    "mood": "Peaceful, calm.",
    "key_objects": [
      "A person",
      "Trees",
      "Grass"
    ]
  },
  "visual_style": null,
  "camera_directives": null,
  "timeline": [
  {
    "sequence_id": 1,
    "timestamp": "00:00-00:05",
    "action": "A person walks from left to right.",
    "camera_instruction": "Follow the person.",
    "audio_description": "Footsteps, birds chirping."
  }
  ],
  "constraints": {
    "negative_prompts": [
      "no cars",
      "no buildings"
    ]
  },
  "final_summary_prompt": "A person walking in a sunny park."
}


Example of a General Prompt for you to replace with the information received:
{
  "metadata": {
    "prompt_name": "string: A descriptive name for your video project",
    "version": "float: e.g., 1.0",
    "target_model": "string: e.g., 'Veo' or 'Veo-2'",
    "core_concept": "string: A one or two-sentence summary of the entire video's story or transformation."
  },
  "scene_setup": {
    "environment": "string: Describe the overall setting. e.g., 'A sunlit Scandinavian room with light wood floors' or 'The deep, dark abyss of the ocean'.",
    "mood": "string: Comma-separated list of keywords describing the feeling. e.g., 'Mythical, majestic, powerful' or 'Clean, serene, minimalist'.",
    "key_objects": [
      "string: List of crucial objects present at the start or that appear during the video."
    ]
  },
  "visual_style": {
    "aesthetic": "string: Comma-separated list of visual keywords. e.g., 'Cinematic, hyper-realistic, elegant' or 'Stop-motion, whimsical, handcrafted'.",
    "color_palette": "string: Describe the dominant colors or lighting style. e.g., 'Dominated by aquamarine light and deep blacks' or 'Bright, airy, with pops of primary colors'.",
    "resolution_and_format": "string: e.g., '8K, 16:9 cinematic widescreen'"
  },
  "camera_directives": {
    "overall_movement": "string: Describe the general camera behavior throughout the video. e.g., 'Fixed wide-angle shot, no movement' or 'Starts with a slow glide, then dynamic tracking'.",
    "shot_types": "string: Comma-separated list of desired shots. e.g., 'Wide shots, extreme close-ups, slow motion'."
  },
  "timeline": [
    {
      "sequence_id": 1,
      "timestamp": "string: e.g., '00:00-00:02'",
      "action": "string: A clear description of the visual action happening in this segment.",
      "camera_instruction": "string: Specific camera movement for this sequence. e.g., 'Slowly zoom in on the glowing object.'",
      "audio_description": "string: Describe the corresponding sounds. e.g., 'A sharp pop, followed by the sound of whirring mechanics.'"
    },
    {
      "sequence_id": 2,
      "timestamp": "string: e.g., '00:02-00:06'",
      "action": "string: Description of the next event.",
      "camera_instruction": "string: e.g., 'Follow the object as it moves across the screen.'",
      "audio_description": "string: e.g., 'A rising orchestral score with satisfying clicks and snaps.'"
    }
  ],
  "constraints": {
    "negative_prompts": [
      "string: List of elements to explicitly avoid. e.g., 'no people', 'cartoonish visuals', 'shaky camera'."
    ]
  },
  "final_summary_prompt": "string: A final, condensed paragraph that combines all the key elements into a single, flowing text prompt. This can serve as a fallback or a summary for the AI."
}

The User Prompt to rewrite with the corresponding JSON format:
'${composedInput}'`;
}
