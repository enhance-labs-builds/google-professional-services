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
import {Observable} from 'rxjs';
import {JobStatus, MediaItem} from '../../common/models/media-item.model';

@Component({
  selector: 'app-video-results',
  templateUrl: './video-results.component.html',
  styleUrl: './video-results.component.scss',
})
export class VideoResultsComponent {
  @Input() isLoading = false;
  @Input() activeVideoJob$!: Observable<MediaItem | null>;
  @Input() showErrorOverlay = true;

  @Output() closeError = new EventEmitter<void>();
  @Output() extendWithAiClicked = new EventEmitter<{
    mediaItem: MediaItem;
    selectedIndex: number;
  }>();
  @Output() concatenateClicked = new EventEmitter<{
    mediaItem: MediaItem;
    selectedIndex: number;
  }>();

  public readonly JobStatus = JobStatus;
}
