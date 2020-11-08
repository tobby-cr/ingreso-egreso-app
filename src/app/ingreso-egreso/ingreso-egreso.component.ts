import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as UIActions from '../shared/ui.actions';
import { IngresoEgresoAppState } from './ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';
  loadingSub: Subscription = new Subscription();
  cargando: boolean;

  constructor(private formBuilder: FormBuilder, private ingresoEgresoService: IngresoEgresoService, private store: Store<IngresoEgresoAppState>) { }

  ngOnInit(): void {
    this.loadingSub = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
    this.buildForm();
  }

  private buildForm(): void {
    this.forma = this.formBuilder.group({
      descripcion: [null, [Validators.required]],
      monto: [null, [Validators.required, Validators.min(0)]]
    });
  }

  crearIngresoEgreso(): void {
    // console.log(this.forma.value);
    // console.log(this.tipo);
    // console.log({...this.forma.value, tipo: this.tipo});

    this.store.dispatch(UIActions.ACTIVAR_LOADING());

    const ingresoEgreso = new IngresoEgreso({...this.forma.value, tipo: this.tipo});

    this.ingresoEgresoService.crearIngresiEgreso(ingresoEgreso)
    .then(() => {
      this.store.dispatch(UIActions.DESACTIVAR_LOADING());

      Swal.fire(
        'Creado',
        ingresoEgreso.descripcion,
        'success'
      );

      this.forma.reset({
        monto: 0
      });
    });
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }

}
