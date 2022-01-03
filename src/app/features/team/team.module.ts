import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeamRoutingModule} from './team-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule} from '@ionic/angular';
import {CoreModule} from '../../core/core.module';
import {OwnTeamsComponent} from './own-teams/own-teams.component';
import {LayoutModule} from '../../layout/layout.module';
import {CustomerTeamsComponent} from './customer-teams/customer-teams.component';


@NgModule({
  declarations: [
    OwnTeamsComponent,
    CustomerTeamsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeamRoutingModule,
    HttpClientModule,
    IonicModule,
    CoreModule,
    LayoutModule
  ]
})
export class TeamModule {
}
