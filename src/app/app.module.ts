import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {environment} from '../environments/environment';
import {SharedModule} from './shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from './core/core.module';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './core/auth/auth.interceptor';
import {LayoutModule} from './layout/layout.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    LayoutModule
  ],
  providers: [
    HttpClientModule,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {provide: 'BACKEND_API_URL', useValue: environment.backendApiUrl},
    {provide: 'DEFAULT_LANGUAGE', useValue: environment.defaultLanguage}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
