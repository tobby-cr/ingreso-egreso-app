import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  // {path: '', component: DashboardComponent},
  {path: '', component: DashboardComponent, children: dashboardRoutes, canActivate: [AuthGuard] }, // ACR. Lo dejo así para seguir el ejercicio del video, pero no debe ser así para los hijos.
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
