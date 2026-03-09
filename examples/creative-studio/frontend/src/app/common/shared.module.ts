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

import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ImageCropperComponent} from 'ngx-image-cropper';

import {CreateWorkspaceModalComponent} from './components/create-workspace-modal/create-workspace-modal.component';
import {InviteUserModalComponent} from './components/invite-user-modal/invite-user-modal.component';
import {WorkspaceSwitcherComponent} from './components/workspace-switcher/workspace-switcher.component';
import {BrandGuidelineDialogComponent} from './components/brand-guideline-dialog/brand-guideline-dialog.component';
import {MediaLightboxComponent} from './components/media-lightbox/media-lightbox.component';
import {ImageSelectorComponent} from './components/image-selector/image-selector.component';
import {ImageCropperDialogComponent} from './components/image-cropper-dialog/image-cropper-dialog.component';
import {SourceAssetGalleryComponent} from './components/source-asset-gallery/source-asset-gallery.component';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {MediaGalleryComponent} from '../gallery/media-gallery/media-gallery.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MarkdownModule} from 'ngx-markdown';

const DECLARATIONS = [
  CreateWorkspaceModalComponent,
  InviteUserModalComponent,
  WorkspaceSwitcherComponent,
  BrandGuidelineDialogComponent,
  MediaLightboxComponent,
  ImageSelectorComponent,
  ImageCropperDialogComponent,
  SourceAssetGalleryComponent,
  ConfirmationDialogComponent,
  MediaGalleryComponent,
];

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatToolbarModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatSnackBarModule,
  MatChipsModule,
  MatExpansionModule,
  MatCardModule,
  MatRadioModule,
  MatStepperModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatButtonToggleModule,
  MatTableModule,
  ScrollingModule,
  ImageCropperComponent,
  NgOptimizedImage,
  MarkdownModule.forRoot(),
];

const EXPORTED_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatToolbarModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatSnackBarModule,
  MatChipsModule,
  MatExpansionModule,
  MatCardModule,
  MatRadioModule,
  MatStepperModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatButtonToggleModule,
  MatTableModule,
  ScrollingModule,
  ImageCropperComponent,
  NgOptimizedImage,
  MarkdownModule,
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...DECLARATIONS, ...EXPORTED_MODULES],
})
export class SharedModule {}
