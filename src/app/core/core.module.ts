import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserCredentials} from './auth/user-credentials';
import {AuthResult} from './auth/auth-result';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    UserCredentials,
    AuthResult
  ]
})
export class CoreModule { }
