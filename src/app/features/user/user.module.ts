import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {UserRoutingModule} from './user-routing.module';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowserModule,
    ReactiveFormsModule,
    UserRoutingModule,
    HttpClientModule
  ],
  exports: [
    LoginComponent
  ]
})
export class UserModule { }
