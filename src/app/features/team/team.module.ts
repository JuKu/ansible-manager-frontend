import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeamRoutingModule} from './team-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule} from '@ionic/angular';
import {CoreModule} from '../../core/core.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeamRoutingModule,
    HttpClientModule,
    IonicModule,
    CoreModule
  ]
})
export class TeamModule {
}
