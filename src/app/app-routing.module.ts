import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {SharedModule} from './shared/shared.module';
import {Error404Component} from './shared/errors/error404/error404.component';
import {Error403Component} from './shared/errors/error403/error403.component';
import {AuthGuard} from './core/auth/auth.guard';
import {LoginComponent} from './features/user/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./features/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./features/user/user.module').then(m => m.UserModule),
    component: LoginComponent
  },
  {
    path: 'teams',
    loadChildren: () => import('./features/team/team.module').then(m => m.TeamModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'error/error403',
    component: Error403Component
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    SharedModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
