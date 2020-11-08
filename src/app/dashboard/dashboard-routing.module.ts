import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: dashboardRoutes
  // , canActivate: [AuthGuard]
 }

];

// El forRoot se usa en las rutas princpales, esta es una hija porque este router estará dentro de otro router y por eso
// se usa el forChild.
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
