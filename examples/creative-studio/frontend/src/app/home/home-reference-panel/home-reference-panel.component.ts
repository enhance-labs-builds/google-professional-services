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
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AssetTypeEnum} from '../../admin/source-assets-management/source-asset.model';
import {ImageCropperDialogComponent} from '../../common/components/image-cropper-dialog/image-cropper-dialog.component';
import {
  ImageSelectorComponent,
  MediaItemSelection,
} from '../../common/components/image-selector/image-selector.component';
import {
  ReferenceImage,
  SourceMediaItemLink,
} from '../../common/models/search.model';
import {SourceAssetResponseDto} from '../../common/services/source-asset.service';
import {handleInfoSnackbar} from '../../utils/handleMessageSnackbar';

@Component({
  selector: 'app-home-reference-panel',
  templateUrl: './home-reference-panel.component.html',
  styleUrl: './home-reference-panel.component.scss',
})
export class HomeReferencePanelComponent {
  @Input() referenceImages: ReferenceImage[] = [];
  @Input() maxReferenceImages = 5;

  @Output() referenceImagesChange = new EventEmitter<ReferenceImage[]>();

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  openImageSelector(index?: number) {
    const dialogRef = this.dialog.open(ImageSelectorComponent, {
      width: '90vw',
      height: '80vh',
      maxWidth: '90vw',
      data: {mimeType: 'image/*'},
      panelClass: 'image-selector-dialog',
    });

    dialogRef
      .afterClosed()
      .subscribe((result: MediaItemSelection | SourceAssetResponseDto) => {
        if (result) {
          this.processInput(result, index);
        }
      });
  }

  openCropperDialog(file: File, index?: number) {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
      data: {imageFile: file, assetType: AssetTypeEnum.GENERIC_IMAGE},
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: SourceAssetResponseDto) => {
      if (result && result.id) {
        this.processInput(result, index);
      }
    });
  }

  onDrop(event: DragEvent, index?: number) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.openCropperDialog(
          files[i],
          index !== undefined ? index + i : undefined,
        );
      }
    }
  }

  clearImage(index: number, event: MouseEvent) {
    event.stopPropagation();
    if (index >= 0 && index < this.referenceImages.length) {
      this.referenceImages.splice(index, 1);
      this.referenceImagesChange.emit(this.referenceImages);
    }
  }

  private processInput(
    result: MediaItemSelection | SourceAssetResponseDto,
    index?: number,
  ) {
    const isGalleryImage = !('gcsUri' in result);
    let previewUrl: string | null = null;
    let sourceAssetId: number | undefined = undefined;
    let sourceMediaItem: SourceMediaItemLink | null = null;

    if (isGalleryImage) {
      const selection = result as MediaItemSelection;
      previewUrl =
        selection.mediaItem.presignedUrls?.[selection.selectedIndex || 0] ||
        null;
      sourceMediaItem = {
        mediaItemId: selection.mediaItem.id,
        mediaIndex: selection.selectedIndex,
        role: 'input',
      };
    } else {
      const asset = result as SourceAssetResponseDto;
      previewUrl = asset.presignedUrl || null;
      sourceAssetId = asset.id;
    }

    if (previewUrl) {
      const refImage: ReferenceImage = {
        previewUrl,
        sourceAssetId: sourceAssetId || undefined,
        sourceMediaItem: sourceMediaItem || undefined,
        isNew: true,
      };

      const isDuplicate = this.referenceImages.some(img => {
        if (sourceAssetId && img.sourceAssetId === sourceAssetId) return true;
        if (
          sourceMediaItem &&
          img.sourceMediaItem &&
          img.sourceMediaItem.mediaItemId === sourceMediaItem.mediaItemId &&
          img.sourceMediaItem.mediaIndex === sourceMediaItem.mediaIndex
        )
          return true;
        return false;
      });

      if (isDuplicate) {
        handleInfoSnackbar(this._snackBar, 'This image is already selected.');
        return;
      }

      if (index !== undefined && index < this.referenceImages.length) {
        this.referenceImages[index] = refImage;
      } else {
        this.referenceImages.push(refImage);
      }

      setTimeout(() => {
        refImage.isNew = false;
      }, 2000);

      this.referenceImagesChange.emit(this.referenceImages);
    }
  }
}
