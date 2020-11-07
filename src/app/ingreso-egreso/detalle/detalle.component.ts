import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor(private ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ingresoEgreso').subscribe(ingresoEgreso => {
      // console.log(ingresoEgreso.items);
      this.items = ingresoEgreso.items;
    });
  }

  borrarItem(item: IngresoEgreso): void {
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
    .then(() => {
      Swal.fire(
        'Eliminado',
        item.descripcion,
        'success'
      );
    })
    .catch(error => {
      console.error(error);
      Swal.fire(
        'Error de eliminacion',
        error.message,
        'error'
      );
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
