import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {UserRoutingModule} from './user-routing.module';
import {LoginComponent} from './login/login.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  exports: [
    LoginComponent
  ]
})
export class UserModule { }
