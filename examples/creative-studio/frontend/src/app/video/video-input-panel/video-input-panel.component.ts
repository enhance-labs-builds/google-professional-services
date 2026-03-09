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

import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-video-input-panel',
  templateUrl: './video-input-panel.component.html',
  styleUrl: './video-input-panel.component.scss',
})
export class VideoInputPanelComponent {
  @Input() image1Preview: string | null = null;
  @Input() image2Preview: string | null = null;
  @Input() currentMode = 'Text to Video';

  @Output() openSelector = new EventEmitter<1 | 2>();
  @Output() clearImage = new EventEmitter<{num: 1 | 2; event: Event}>();
  @Output() fileDrop = new EventEmitter<{event: DragEvent; imageNumber: 1 | 2}>();
}
