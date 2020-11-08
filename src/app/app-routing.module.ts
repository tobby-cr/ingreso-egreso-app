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
  // {path: '', component: DashboardComponent, children: dashboardRoutes, canActivate: [AuthGuard] },
  {
    path: '',
    // canActivate: [AuthGuard], // ACR. Se agrega el Guard para proteger las rutas. No se usa aqui porque lo que se quiere
    //                              es que no cargue el module si no pasa la validación de autenticación.
    canLoad: [AuthGuard], // ACR. Sirve para cargar un modulo de caracteristicas de manera asincrona. Se puede indicar
    //                       que no cargue el modulo si no se cumplen ciertas condiciones como la autenticación.
    // Usa dynamic import para carga modo lazy.
    loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module').then(m => m.IngresoEgresoModule)
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
