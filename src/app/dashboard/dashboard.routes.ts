import { Routes } from '@angular/router';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';

export const dashboardRoutes: Routes = [
  { path: '', component: EstadisticaComponent },
  { path: 'ingreso-egreso', component: IngresoEgresoComponent },
  { path: 'detalle', component: DetalleComponent }
];






// ACR. Así es como se debe hacer:
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
// import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
// import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';

// const routes: Routes = [
//   { path: '', component: EstadisticaComponent },
//   { path: 'ingreso-egreso', component: IngresoEgresoComponent },
//   { path: 'detalle', component: DetalleComponent }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class PagesRoutingModule { }
