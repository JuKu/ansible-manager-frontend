import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageHeaderComponent} from './page-header/page-header.component';
import {IonicModule} from '@ionic/angular';
import {PageContentComponent} from './page-content/page-content.component';
import {PageComponent} from './page-layout/page.component';



@NgModule({
  declarations: [
    PageHeaderComponent,
    PageContentComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PageHeaderComponent,
    PageContentComponent,
    PageComponent
  ]
})
export class LayoutModule { }
