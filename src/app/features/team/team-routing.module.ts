import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '../user/login/login.component';
import {OwnTeamsComponent} from './own-teams/own-teams.component';
import {AuthGuard} from '../../core/auth/auth.guard';
import {CustomerTeamsComponent} from './customer-teams/customer-teams.component';

const routes: Routes = [
  {
    path: '',
    component: OwnTeamsComponent,
    canActivate: [AuthGuard],
    /*children: [
      { path: '', component: HomePage },
      { path: 'test/:id', component: Testinfo},
      { path: 'test2/:id', component: Testinfo1},
      { path: 'test3/:id', component: Testinfo2}
    ]*/
  },
  {
    path: 'own-teams',
    component: OwnTeamsComponent
  },
  {
    path: 'customer-teams',
    component: CustomerTeamsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
