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

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import {MediaItem} from '../../common/models/media-item.model';

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.component.html',
  styleUrl: './home-results.component.scss',
})
export class HomeResultsComponent implements AfterViewInit, OnDestroy {
  @Input() isLoading = false;
  @Input() isImageGenerating = false;
  @Input() imagenDocuments: MediaItem | null = null;

  @Output() editClicked = new EventEmitter<number>();
  @Output() generateVideoClicked = new EventEmitter<{role: 'start' | 'end'; index: number}>();
  @Output() sendToVtoClicked = new EventEmitter<number>();

  @ViewChild('interactiveBubble') interBubble!: ElementRef<HTMLDivElement>;

  private curX = 0;
  private curY = 0;
  private tgX = 0;
  private tgY = 0;
  private animationFrameId: number | undefined;

  ngAfterViewInit(): void {
    if (this.interBubble && this.interBubble.nativeElement) {
      this.move();
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined')
      window.removeEventListener('mousemove', this.onMouseMove);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined')
      window.addEventListener('mousemove', this.onMouseMove);
  }

  private onMouseMove = (event: MouseEvent) => {
    this.tgX = event.clientX;
    this.tgY = event.clientY;
  };

  private move = () => {
    this.curX += (this.tgX - this.curX) / 20;
    this.curY += (this.tgY - this.curY) / 20;

    if (this.interBubble && this.interBubble.nativeElement) {
      this.interBubble.nativeElement.style.transform = `translate(${Math.round(this.curX)}px, ${Math.round(this.curY)}px)`;
    }

    this.animationFrameId = requestAnimationFrame(this.move);
  };
}
