import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private afDB: AngularFirestore, private router: Router) { }

  initAuthListener(): void {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log(fbUser);
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
      });

    })
    .catch(error => {
      console.error(error);
      Swal.fire(
        'Error en el register',
        error.message,
        'error'
      );
    });
  }

  login(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(resp => {
      // console.log(resp);
      this.router.navigate(['/']);
    })
    .catch(error => {
      console.error(error);
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
