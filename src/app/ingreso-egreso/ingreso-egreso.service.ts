import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { AuthService } from '../auth/auth.service';
import * as IngresoEgresoActions from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListerSubscription: Subscription = new Subscription();
  ingresoEgresoItemsSubscription: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore, private authService: AuthService, private store: Store<AppState>) { }

  initIngresoEgresoListener(): void {
    this.ingresoEgresoListerSubscription = this.store.select('auth')
    // ACR. Antes de que llegue la informacion primero llega un null y para evitar recibirlo, se usa el pipe para usar el filter.
    .pipe(
      filter(auth => auth.user !== null)
    )
    .subscribe(auth => {
      // console.log(auth.user.uid);
      this.IngresoEgresoItems(auth.user.uid);
    });
  }

  cancelarSubcriptions(): void {
    this.ingresoEgresoListerSubscription.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();

    this.store.dispatch(IngresoEgresoActions.UNSET_ITEMS());
  }

  crearIngresiEgreso(ingresoEgreso: IngresoEgreso): Promise<DocumentReference> {
    const user = this.authService.getUsuario();

    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
    .collection('items').add({...ingresoEgreso});
  }

  borrarIngresoEgreso(uid: string): Promise<void> {
    const user = this.authService.getUsuario();

    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete();
  }

  private IngresoEgresoItems(uid: string): void {
    this.ingresoEgresoItemsSubscription = this.afDB.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges() // ACR. Para poder rescatar el id de la informacion se usa el snapshotChanges
    .pipe( // ACR. Se usa el map() para rescatar solo lo necesario del snapshotChanges
      map(
        docData => {
          return docData.map(doc => { // ACR. Este map es de javascript para transformar cada uno de los elementos.
            return {
              uid: doc.payload.doc.id,
              // ACR. Sin el operador spread ..., lo tendría que hacder así para todas las propiedades: monto: doc.payload.doc.data().monto.
              // ...doc.payload.doc.data() ACR. Así da error.
              ...doc.payload.doc.data() as {} // ACR. Para evita el error se usa el {}, esto le dirá al compilador
                                              // que trate ...doc.payload.doc.data() como un objeto.
            };
          });
        }
      )
    )
    .subscribe(
      (coleccion: any[]) => {
        const accion = IngresoEgresoActions.SET_ITEMS({items: coleccion});
        this.store.dispatch(accion);
      }
    );
  }
}
