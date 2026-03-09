import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {HomeComponent} from './home.component';
import {HomeSettingsPanelComponent} from './home-settings-panel/home-settings-panel.component';
import {HomeReferencePanelComponent} from './home-reference-panel/home-reference-panel.component';
import {HomeResultsComponent} from './home-results/home-results.component';
import {FlowPromptBoxComponent} from '../common/components/flow-prompt-box/flow-prompt-box.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeSettingsPanelComponent,
    HomeReferencePanelComponent,
    HomeResultsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    FlowPromptBoxComponent,
    RouterModule.forChild([{path: '', component: HomeComponent}]),
  ],
})
export class HomeModule {}
