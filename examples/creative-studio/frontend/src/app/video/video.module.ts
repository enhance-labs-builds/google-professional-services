import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../common/shared.module';
import {VideoComponent} from './video.component';
import {VideoSettingsPanelComponent} from './video-settings-panel/video-settings-panel.component';
import {VideoInputPanelComponent} from './video-input-panel/video-input-panel.component';
import {VideoReferencePanelComponent} from './video-reference-panel/video-reference-panel.component';
import {VideoResultsComponent} from './video-results/video-results.component';
import {FlowPromptBoxComponent} from '../common/components/flow-prompt-box/flow-prompt-box.component';

@NgModule({
  declarations: [
    VideoComponent,
    VideoSettingsPanelComponent,
    VideoInputPanelComponent,
    VideoReferencePanelComponent,
    VideoResultsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlowPromptBoxComponent,
    RouterModule.forChild([{path: '', component: VideoComponent}]),
  ],
})
export class VideoModule {}
