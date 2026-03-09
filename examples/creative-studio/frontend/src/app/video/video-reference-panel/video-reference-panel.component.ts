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
import {ReferenceImage} from '../../common/models/search.model';

@Component({
  selector: 'app-video-reference-panel',
  templateUrl: './video-reference-panel.component.html',
  styleUrl: './video-reference-panel.component.scss',
})
export class VideoReferencePanelComponent {
  @Input() referenceImages: ReferenceImage[] = [];
  @Input() referenceImagesType: 'ASSET' | 'STYLE' = 'ASSET';

  @Output() openImageSelectorForReference = new EventEmitter<void>();
  @Output() referenceImageDrop = new EventEmitter<DragEvent>();
  @Output() clearReferenceImage = new EventEmitter<{
    index: number;
    event: Event;
  }>();
  @Output() toggleReferenceImagesType = new EventEmitter<boolean>();
}
