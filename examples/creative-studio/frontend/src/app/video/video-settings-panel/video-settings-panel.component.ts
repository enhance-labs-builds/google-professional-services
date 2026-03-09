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
import {MatChipInputEvent} from '@angular/material/chips';
import {VeoRequest} from '../../common/models/search.model';

@Component({
  selector: 'app-video-settings-panel',
  templateUrl: './video-settings-panel.component.html',
  styleUrl: './video-settings-panel.component.scss',
})
export class VideoSettingsPanelComponent {
  @Input() searchRequest!: VeoRequest;
  @Input() negativePhrases: string[] = [];
  @Input() videoStyles: string[] = [];
  @Input() lightings: string[] = [];
  @Input() colorsAndTones: string[] = [];
  @Input() compositions: string[] = [];
  @Input() durationOptions: number[] = [];
  @Input() isAudioGenerationDisabled = false;

  @Output() styleSelected = new EventEmitter<string>();
  @Output() lightingSelected = new EventEmitter<string>();
  @Output() colorSelected = new EventEmitter<string>();
  @Output() compositionSelected = new EventEmitter<string>();
  @Output() durationSelected = new EventEmitter<number>();
  @Output() audioToggled = new EventEmitter<void>();
  @Output() negativePhraseAdded = new EventEmitter<MatChipInputEvent>();
  @Output() negativePhraseRemoved = new EventEmitter<string>();
  @Output() brandGuidelinesChanged = new EventEmitter<void>();
}
