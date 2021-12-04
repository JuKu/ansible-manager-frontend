import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {UserRoutingModule} from './user-routing.module';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    HttpClientModule,
    IonicModule
  ],
  exports: [
    LoginComponent
  ]
})
export class UserModule { }
