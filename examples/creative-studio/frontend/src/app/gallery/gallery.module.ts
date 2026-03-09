import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../common/shared.module';
import {MediaGalleryComponent} from './media-gallery/media-gallery.component';
import {MediaDetailComponent} from './media-detail/media-detail.component';

@NgModule({
  declarations: [MediaDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: MediaGalleryComponent},
      {path: ':id', component: MediaDetailComponent},
    ]),
  ],
})
export class GalleryModule {}
