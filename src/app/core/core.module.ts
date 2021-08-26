import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCredentials} from './auth/user-credentials';
import {AuthResult} from './auth/auth-result';
import {HttpClientModule} from '@angular/common/http';
import {RestAPIService} from './rest/rest-api.service';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    UserCredentials,
    AuthResult
  ],
  providers: [
    RestAPIService
  ]
})
export class CoreModule {
}
