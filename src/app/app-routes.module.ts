import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginVerticalComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'prefix'},
  { path: 'login', component: LoginVerticalComponent},
  { path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

