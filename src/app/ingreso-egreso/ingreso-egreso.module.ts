import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // ACR. Para los formularios reactivos.
    SharedModule,
    ChartsModule,
    DashboardRoutingModule,
    // ACR. Se hace así, aquí, para que se carge el reducer cuando sea cargado el ingreso-egreso.module. Osea, el forFeature
    // es para expandir el store actual.
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer)
  ],
  exports: [ // Para poner todos los componentes o servicios que seran usados fuera de este modulo.

  ]
})
export class IngresoEgresoModule { }
