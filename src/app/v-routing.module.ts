import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { ObserveruserComponent } from './observeruser/observeruser.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'prefix'},
  {path: 'login', loadChildren: './landing/landing.module#LandingModule'},
  {path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [AuthGuard]},
  {path: 'default', component: ObserveruserComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [HomeModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class VRoutingModule {
}
