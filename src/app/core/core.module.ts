import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserCredentials} from './auth/user-credentials';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    UserCredentials
  ]
})
export class CoreModule { }
