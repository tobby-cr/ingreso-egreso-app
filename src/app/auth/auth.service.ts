import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as UIActions from '../shared/ui.actions';
import * as AuthActions from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ACR. Se le hace un new Subscription() para que la variable tenga un valor en caso que no exista una suscripcion pero si
  // se haga la desuscripcion.
  private userSubscription: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth, private afDB: AngularFirestore, private router: Router, private store: Store<AppState>) { }

  initAuthListener(): void {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      // console.log(fbUser);

      if (fbUser) {
        // ACR. Esto va a estar escuchando y cuando un usuario sea modificado en firebase. Ojo que se debe desuscribir cuando se cierre
        // sesion porque de no hacerlo van a existir n suscripciones escuchando si se hace otro login.
        this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges().subscribe(
          (usuarioObj: any) => {
            const newUser = new User(usuarioObj);

            const accion = AuthActions.SET_USER({user: newUser});
            this.store.dispatch(accion);
          }
        );
      } else { // ACR. Si fbUser viene nulo puede ser que cerro sesion o paso otra cosa, en ese caso hay que desuscribir.
        this.userSubscription.unsubscribe();
      }
    });
  }

  isAuth(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if (fbUser === null) {
          this.router.navigate(['/login']);
        }
        return fbUser !== null;
      }));
  }

  crearUsuario(nombre: string, email: string, password: string): void {

    this.store.dispatch(UIActions.ACTIVAR_LOADING());

    this.afAuth.createUserWithEmailAndPassword(email, password) // ACR. Con esta funcion el usuario creado ya queda autenticado.
    .then(resp => {
      // console.log(resp);

      const user: User = {
        uid: resp.user.uid,
        nombre,
        email: resp.user.email
      };

      this.afDB.doc(`${user.uid}/usuario`)
      .set(user)
      .then(() => {
        this.router.navigate(['/']);
        this.store.dispatch(UIActions.DESACTIVAR_LOADING());
      });

    })
    .catch(error => {
      console.error(error);
      this.store.dispatch(UIActions.DESACTIVAR_LOADING());
      Swal.fire(
        'Error en el register',
        error.message,
        'error'
      );
    });
  }

  login(email: string, password: string): void {
    this.store.dispatch(UIActions.ACTIVAR_LOADING());

    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(resp => {
      // console.log(resp);
      this.store.dispatch(UIActions.DESACTIVAR_LOADING());
      this.router.navigate(['/']);
    })
    .catch(error => {
      console.error(error);
      this.store.dispatch(UIActions.DESACTIVAR_LOADING());
      Swal.fire(
        'Error en el login',
        error.message,
        'error'
      );
    });
  }

  logout(): void {
    this.router.navigate(['/login']);
    this.afAuth.signOut();
  }
}
