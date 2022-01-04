import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {PageComponent} from './page-layout/page.component';



@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PageComponent
  ]
})
export class LayoutModule { }
