import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MyWorklistPageComponent } from './pages/my-worklist-page/my-worklist-page.component';
import { ViewAdministrationPageComponent } from './pages/view-administration-page/view-administration-page.component';
import { AuthGuard } from './shared/services/auth.guard';
import { Roles } from '../config/configuration';

const routes: Routes = [
  { path: 'login-page', component: LoginPageComponent },
  {
    path: 'my-worklist-page',
    component: MyWorklistPageComponent,
    canActivate: [AuthGuard],
    data: { role: [Roles.siteAdmin, Roles.accountManagement] }
  },
  {
    path: 'view-administration-page',
    component: ViewAdministrationPageComponent,
    canActivate: [AuthGuard],
    data: { role: [Roles.siteAdmin, Roles.accountManagement] }
  },
  {
    path: 'view-administration-page/:pageType',
    component: ViewAdministrationPageComponent,
    canActivate: [AuthGuard],
    data: { role: [Roles.siteAdmin, Roles.accountManagement] }
  },
  { path: '**', redirectTo: 'login-page' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
