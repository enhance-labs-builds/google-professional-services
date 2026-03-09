import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../common/shared.module';
import {AudioComponent} from './audio.component';
import {AddVoiceDialogComponent} from '../components/add-voice-dialog/add-voice-dialog.component';

@NgModule({
  declarations: [AudioComponent, AddVoiceDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: AudioComponent}]),
  ],
})
export class AudioModule {}
