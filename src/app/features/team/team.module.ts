import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeamRoutingModule} from './team-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule} from '@ionic/angular';
import {CoreModule} from '../../core/core.module';
import {OwnTeamsComponent} from './own-teams/own-teams.component';


@NgModule({
  declarations: [
    OwnTeamsComponent
  ],
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
