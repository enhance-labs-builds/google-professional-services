import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../common/shared.module';
import {FunTemplatesComponent} from './fun-templates.component';

@NgModule({
  declarations: [FunTemplatesComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: FunTemplatesComponent}]),
  ],
})
export class FunTemplatesModule {}
