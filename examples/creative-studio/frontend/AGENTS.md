# Creative Studio — AI Builder Guide

This is a multi-modal creative AI studio. The frontend owns all prompt engineering and business logic. The backend is a thin API gateway (auth, storage, model APIs, LLM proxy). **You can build entirely new creative features by only touching the frontend.**

## Architecture (How It Works)

```
User Input → PromptComposerService → LLM Proxy → Gemini rewrites prompt → Backend API (Imagen/Veo/Lyria) → GCS → Gallery
```

1. User fills out a form (prompt, model, style, aspect ratio, etc.)
2. Frontend composes all fields into a structured string
3. Frontend wraps it in a prompt template with few-shot JSON examples
4. Frontend sends it to `/api/llm/generate-content` (Gemini rewrites it)
5. Frontend sends the rewritten prompt to the generation API with `skipPromptEnhancement: true`
6. Backend calls Imagen/Veo/Lyria, stores results in GCS, polls until done

The key insight: **step 2-4 are where all the creative intelligence lives**, and it's all frontend TypeScript.

## Directory Structure

```
src/app/
├── common/
│   ├── prompts/              ← Prompt templates (THE CREATIVE BRAIN)
│   │   ├── image-rewrite.prompt.ts
│   │   ├── video-rewrite.prompt.ts
│   │   ├── gemini-i2i.prompt.ts
│   │   └── random-and-rewrite.prompt.ts
│   ├── services/
│   │   ├── llm/llm.service.ts                      ← HTTP client for LLM proxy
│   │   ├── prompt-composer/prompt-composer.service.ts ← Orchestrates the full pipeline
│   │   └── brand-guideline/brand-guideline.service.ts
│   ├── models/search.model.ts                       ← ImagenRequest, VeoRequest types
│   └── config/model-config.ts                       ← All model definitions + capabilities
├── home/           ← Image generation feature
├── video/          ← Video generation feature
├── audio/          ← Audio generation feature
├── vto/            ← Virtual try-on feature
├── fun-templates/  ← Template-based generation
├── gallery/        ← Media gallery
└── admin/          ← User/asset/template management

../backend/src/
├── multimodal/
│   ├── llm_proxy_controller.py   ← Generic LLM proxy (POST /api/llm/generate-content)
│   ├── gemini_service.py         ← Gemini client (generate_text, generate_structured_prompt)
│   └── gemini_controller.py      ← Legacy rewrite/random endpoints (still works)
├── images/imagen_controller.py   ← POST /api/images/generate-images
├── videos/veo_controller.py      ← POST /api/videos/generate-videos
└── audios/audio_controller.py    ← POST /api/audios/generate
```

## How to Build a New Feature

Every new creative feature follows the same 3-step pattern:

### Step 1: Write a Prompt Template

Create `src/app/common/prompts/your-feature.prompt.ts`. This is where the creative intelligence lives.

A prompt template is a function that takes user input and returns a string that tells Gemini exactly how to rewrite the user's prompt. Include 2-4 few-shot JSON examples showing the output structure you want.

Look at `image-rewrite.prompt.ts` as the canonical example. Key elements:
- Instruction telling Gemini to rewrite, not generate
- 2+ few-shot JSON examples showing the desired output format
- A generic template showing what each field means
- Edge case examples (e.g., empty style fields)
- A placeholder where the user's composed input goes (`${composedInput}`)

For image-to-image editing features (like the Gemini i2i flow), use `gemini-i2i.prompt.ts` as the pattern — scenario-based instructions that go directly to the model without JSON rewriting.

### Step 2: Wire Up a Component

Create a new module + component, or extend an existing one. The wiring pattern:

```typescript
// Inject these
constructor(
  private promptComposerService: PromptComposerService,
  private llmService: LlmService,
  private searchService: SearchService,
) {}

// For generation: compose → enhance → generate
generate() {
  this.promptComposerService.enhanceImagePrompt(request, workspaceId)
    .pipe(
      switchMap(enhancedPrompt => {
        request.prompt = enhancedPrompt;
        request.skipPromptEnhancement = true;
        return this.searchService.startImagenGeneration(request);
      })
    )
    .subscribe();
}

// For simple LLM calls (rewrite, random, etc.): call directly
rewrite() {
  this.llmService.generateContent(
    buildYourPromptTemplate(userInput),
    undefined,           // systemInstruction (optional)
    'application/json',  // use for structured output, omit for plain text
  ).subscribe(result => { ... });
}
```

### Step 3: Add Routing

In `app-routing.module.ts`, add a lazy-loaded route:

```typescript
{ path: 'your-feature', loadChildren: () => import('./your-feature/your-feature.module').then(m => m.YourFeatureModule), canActivate: [AuthGuardService] }
```

That's it. The backend, auth, storage, polling — all handled automatically.

## Backend API Endpoints (What You Can Call)

### Generation APIs

| Endpoint | Method | What It Does |
|---|---|---|
| `/api/images/generate-images` | POST | Generate images (text-to-image, image-to-image) |
| `/api/images/generate-images-for-vto` | POST | Virtual try-on generation |
| `/api/images/upscale-image` | POST | Upscale images (2x, 4x) |
| `/api/videos/generate-videos` | POST | Generate videos (text-to-video, image-to-video) |
| `/api/videos/concatenate` | POST | Concatenate multiple videos |
| `/api/audios/generate` | POST | Generate audio (music via Lyria, TTS via Chirp/Gemini) |
| `/api/audios/transcribe` | POST | Speech-to-text transcription |

### AI & Prompt APIs

| Endpoint | Method | What It Does |
|---|---|---|
| `/api/llm/generate-content` | POST | Generic LLM proxy — send any prompt to Gemini. Supports `response_mime_type: "application/json"` for structured output |
| `/api/gemini/rewrite-prompt` | POST | Legacy server-side prompt rewrite (still works) |
| `/api/gemini/random-prompt` | POST | Legacy server-side random prompt (still works) |

### Data APIs

| Endpoint | Method | What It Does |
|---|---|---|
| `/api/gallery/search` | POST | Search generated media (paginated) |
| `/api/gallery/item/{id}` | GET | Get single media item |
| `/api/source_assets/upload` | POST | Upload source assets (images/videos) |
| `/api/source_assets/search` | POST | Search source assets (paginated) |
| `/api/brand-guidelines/workspace/{id}` | GET | Get brand guidelines for workspace |
| `/api/options/image-generation` | GET | Get all available generation parameters |
| `/api/media-templates` | GET | List reusable templates |

### Auth & Admin APIs

| Endpoint | Method | What It Does |
|---|---|---|
| `/api/users/me` | GET | Current user profile |
| `/api/workspaces` | GET/POST | List/create workspaces |
| `/api/users` | GET/PUT/DELETE | User management (admin) |

## Available Models

### Image Models
- **Gemini 3 Pro Image** (`gemini-3-pro-image-preview`) — up to 14 reference images, i2i editing
- **Gemini 2.5 Flash Image** (`gemini-2.5-flash-image-preview`) — fast, up to 2 reference images, i2i editing
- **Imagen 4** (`imagen-4.0-generate-001`) — highest quality text-to-image
- **Imagen 4 Ultra** (`imagen-4.0-ultra-generate-001`) — ultra quality
- **Imagen 4 Fast** (`imagen-4.0-fast-generate-001`) — fast generation
- **Imagen 3** (`imagen-3.0-generate-001`, `imagen-3.0-fast-generate-001`)

### Video Models
- **Veo 3.1** (`veo-3.1-generate-preview`) — latest, audio support
- **Veo 3.0** (`veo-3.0-generate-001`, `veo-3.0-fast-generate-001`) — audio support
- **Veo 2.0** (`veo-2.0-generate-001`, `veo-2.0-fast-generate-001`)

### Audio Models
- **Lyria** (`lyria-002`) — music generation
- **Gemini TTS** (`gemini-2.5-flash-tts`) — text-to-speech, 30+ voices, 30+ languages
- **Chirp** (`chirp_3`) — speech recognition

## Generation Parameters

All image/video generation supports these creative controls:
- **Aspect Ratios**: 1:1, 16:9, 9:16, 3:4, 4:3, 2:3, 3:2, 4:5, 5:4, 21:9
- **Styles**: Modern, Realistic, Vintage, Monochrome, Fantasy, Sketch, Photorealistic, Cinematic
- **Lighting**: Backlighting, Dramatic, Golden Hour, Studio, Natural, Ambient, Cinematic, Low, Multiexposure
- **Color & Tone**: Vibrant, Warm, Cool, Pastel, Muted, Monochromatic, Golden, Toned, Black & White
- **Composition**: Closeup, Wide angle, Shallow depth of field, Rule of thirds, Landscape, Shot from above/below
- **Negative Prompts**: Free text exclusions
- **Brand Guidelines**: Auto-injected from workspace PDF uploads
- **Reference Images**: Source assets or previously generated media

## Request Types

```typescript
// Image generation
interface ImagenRequest {
  prompt: string;
  generationModel: string;    // e.g., 'imagen-4.0-generate-001'
  aspectRatio?: string;
  style?: string;
  lighting?: string;
  colorAndTone?: string;
  composition?: string;
  negativePrompt?: string;
  numberOfMedia?: number;      // 1-4
  useBrandGuidelines?: boolean;
  addWatermark?: boolean;
  googleSearch?: boolean;
  resolution?: string;         // '1024', '2048', '4096'
  sourceAssetIds?: string[];   // for image-to-image
  sourceMediaItems?: SourceMediaItemLink[];
  skipPromptEnhancement?: boolean;  // true = frontend already enhanced
}

// Video generation
interface VeoRequest {
  prompt: string;
  generationModel: string;    // e.g., 'veo-3.0-generate-001'
  aspectRatio?: string;
  style?: string;
  lighting?: string;
  colorAndTone?: string;
  composition?: string;
  negativePrompt?: string;
  numberOfMedia?: number;      // 1-4
  durationSeconds?: number;    // 1-8
  generateAudio?: boolean;
  useBrandGuidelines?: boolean;
  referenceImages?: ReferenceImage[];  // up to 3
  sourceAssetIds?: string[];
  sourceMediaItems?: SourceMediaItemLink[];
  skipPromptEnhancement?: boolean;
}
```

## Ideas: What You Can Build

Every idea below uses the **exact same infrastructure** — just new prompt templates and UI components. No backend changes needed.

### Image Features
1. **Product Photography Studio** — Upload a product photo, describe the scene (on marble, in nature, studio lighting), get professional product shots. Uses Gemini i2i with a product-photography prompt template.
2. **Ad Creative Generator** — Input brand name, tagline, target audience, product image. Prompt template emphasizes commercial composition, copy-safe zones, brand consistency. Output goes straight to Imagen 4.
3. **Vehicle Compositing** — Upload a vehicle image + a background scene. Prompt template handles realistic placement, lighting matching, shadow generation. Uses Gemini 3 Pro (14 reference images).
4. **Real Estate Staging** — Upload empty room photos, describe desired furniture/style. Gemini i2i prompt template with interior design scenarios (modern, rustic, minimalist, etc.).
5. **Fashion Lookbook** — Upload garment flat-lays, generate styled outfit compositions on models. Combines VTO assets with custom prompt templates.
6. **Before/After Renovation** — Upload a building/room photo, describe changes. Gemini i2i with architectural renovation scenarios.
7. **Logo Variations** — Upload a logo, generate it in different styles, materials, and contexts (embossed on leather, neon sign, watercolor, etc.).
8. **Food Photography** — Text-to-image with a prompt template optimized for food styling: plating, garnish, lighting angles, surface textures, steam/condensation effects.
9. **Mood Board Generator** — Input a theme/vibe, generate a grid of cohesive images. Multiple Imagen calls with a prompt template that maintains visual consistency across outputs.
10. **Architecture Visualization** — Describe a building, get photorealistic exterior/interior renders. Prompt template with architectural photography directives.

### Video Features
11. **Product Demo Videos** — Upload product images, describe the demo flow. Video prompt template with timeline sequences for unboxing, features, 360-degree views.
12. **Social Media Ad Clips** — Input brand + message + style, get 6-8 second ad videos. Prompt template with platform-specific framing (vertical for Reels/TikTok, horizontal for YouTube).
13. **Animated Logo Reveals** — Upload logo, describe animation style. Video prompt template with timeline for build-up, reveal, and settle.
14. **Cinematic B-Roll** — Describe a scene/mood, generate atmospheric footage. Prompt template heavy on camera movements, lens effects, and temporal elements.
15. **Explainer Video Scenes** — Describe a concept, generate individual scenes. Concatenate API to stitch them together.

### Multi-Modal Features
16. **Full Ad Campaign** — Single brief generates: hero image (Imagen), video ad (Veo), background music (Lyria), voiceover (Gemini TTS). All from one prompt, using multiple prompt templates.
17. **Podcast Visualizer** — Upload audio, transcribe (Chirp), generate scene images from transcript segments, create video with synchronized visuals.
18. **Brand Asset Pack** — Input brand guidelines PDF, auto-generate: social media templates, presentation backgrounds, icon sets, brand patterns. All consistent with the uploaded brand guidelines.

### Interactive / Multi-Step Features
19. **Iterative Refinement** — Generate → user picks favorite → refine with natural language ("make it warmer", "zoom out more"). Uses Gemini i2i chain.
20. **A/B Testing Generator** — Generate multiple variations of an ad/image with different styles, then present them side-by-side for comparison. Same prompt, different style parameters.
21. **Storyboard Builder** — Multi-step wizard: describe a story, generate scene-by-scene images, then optionally generate video for each scene, then concatenate.

## Patterns to Follow

### Prompt Template Pattern
```typescript
// src/app/common/prompts/your-feature.prompt.ts

export function buildYourPrompt(composedInput: string): string {
  return `Your instructions to Gemini here.
Do not generate images/videos, provide only the rewritten prompt.

Example 1:
{ ... your few-shot JSON example ... }

Example 2:
{ ... another example ... }

The user's input to rewrite:
'${composedInput}'`;
}
```

### Gemini i2i Editing Pattern (for image-to-image features)
```typescript
// No JSON rewriting — direct scenario-based instructions to the model
export function buildYourEditingPrompt(userRequest: string): string {
  return `**Objective:** [What the model should do with the source image]
**Guiding Principle:** [What to preserve vs change]

--- Scenarios ---
**1. [Scenario Name]** (e.g., '[trigger phrases]')
   - **Action:** [What to do]
   - **Constraint:** [What NOT to change]

**2. [Another Scenario]**
   ...

**User's Request:** ${userRequest}`;
}
```

### Component Wiring Pattern
```typescript
// 1. Import services and prompt builders
import { PromptComposerService } from '../../common/services/prompt-composer/prompt-composer.service';
import { LlmService } from '../../common/services/llm/llm.service';
import { buildYourPrompt } from '../../common/prompts/your-feature.prompt';

// 2. Inject in constructor
constructor(
  private promptComposerService: PromptComposerService,
  private llmService: LlmService,
  private searchService: SearchService,
  private workspaceState: WorkspaceStateService,
) {}

// 3. For image generation with prompt enhancement:
onGenerate() {
  const request: ImagenRequest = { /* form values */ };
  const workspaceId = this.workspaceState.getActiveWorkspaceId();

  this.promptComposerService.enhanceImagePrompt(request, workspaceId).pipe(
    switchMap(enhanced => {
      request.prompt = enhanced;
      request.skipPromptEnhancement = true;
      return this.searchService.startImagenGeneration(request);
    })
  ).subscribe();
}

// 4. For custom LLM calls (not image/video generation):
onCustomLlmCall() {
  this.llmService.generateContent(
    buildYourPrompt(userInput),
    undefined,
    'application/json',  // or omit for plain text
  ).subscribe(result => {
    // Parse and use the result
  });
}
```

### Module Pattern
```typescript
@NgModule({
  declarations: [YourComponent, YourSubComponents],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: YourComponent }]),
    SharedModule,  // Material UI components
  ],
})
export class YourFeatureModule {}
```

## Important Details

- **Auth is automatic**: `AuthInterceptor` adds Firebase Bearer tokens to all `/api` requests
- **Proxy config**: `proxy.conf.js` routes `/api` to the Cloud Run backend — no CORS issues in local dev
- **Job polling**: `SearchService.startImagenGeneration()` and `startVeoGeneration()` handle async polling automatically
- **Brand guidelines**: `PromptComposerService` handles injection automatically when `useBrandGuidelines: true`
- **Gemini i2i detection**: `PromptComposerService` automatically detects when a Gemini image model + source images are used and switches to the i2i prompt flow (no JSON rewriting)
- **LLM proxy supports JSON mode**: Pass `responseMimeType: 'application/json'` to `LlmService.generateContent()` for structured output — Gemini will output clean JSON without markdown wrapping
- **All models are in `model-config.ts`**: Add new models there; the UI dropdowns read from it
