import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {FolderPage} from './folder.page';
import {AuthGuard} from '../core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FolderPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {
}
