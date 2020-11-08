import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Firebase
import { AngularFireAuthModule } from '@angular/fire/auth';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule, // ACR. Para el ngIf, ngFor, etc.
    RouterModule,
    FormsModule, // ACR. Para los formularios por template.
    AngularFireAuthModule
  ],
  exports: [ // Para poner todos los componentes o servicios que seran usados fuera de este modulo.

  ]
})
export class AuthModule { }
