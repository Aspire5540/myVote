import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OpsamapComponent } from './opsamap/opsamap.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EndpageComponent} from './endpage/endpage.component'
import {AuthGuard} from './auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'vote', component: OpsamapComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'end', component: EndpageComponent},
  ];
  // ,canActivate:[AuthGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
