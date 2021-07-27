import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { SlidePanelComponent } from './slide-panel';


@NgModule({
  imports: [
      CommonModule,
  ],
  declarations: [
    SlidePanelComponent
  ],
  exports: [
    SlidePanelComponent
  ],
  providers: [
  ]
})

export class SharedModule { }
