import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Error404Component} from './errors/error404/error404.component';
import {Error403Component} from './errors/error403/error403.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    Error404Component,
    Error403Component
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    Error404Component,
    Error403Component
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
