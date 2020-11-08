import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
// import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
// import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
// import { FooterComponent } from './shared/footer/footer.component';
// import { NavbarComponent } from './shared/navbar/navbar.component';
// import { SidebarComponent } from './shared/sidebar/sidebar.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireAuthModule } from '@angular/fire/auth';

// Environment
import { environment } from 'src/environments/environment';

// NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromReducers from './app.reducer';

// import { OrdenIngresoEgresoPipe } from './ingreso-egreso/orden-ingreso-egreso.pipe';

// Graficas
// import { ChartsModule } from 'ng2-charts';

// Modulos personalizados
import { AuthModule } from './auth/auth.module';
// import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // RegisterComponent,
    // DashboardComponent,
    // IngresoEgresoComponent,
    // EstadisticaComponent,
    // DetalleComponent,
    // FooterComponent,
    // NavbarComponent,
    // SidebarComponent,
    // OrdenIngresoEgresoPipe
  ],
  imports: [
    BrowserModule,
    AuthModule,
    // IngresoEgresoModule,
    AppRoutingModule,
    // FormsModule, // ACR. Para los formularios por template.
    // ReactiveFormsModule, // ACR. Para los formularios reactivos.
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    // AngularFireAuthModule,
    // ChartsModule,
    StoreModule.forRoot(fromReducers.reducers), // ACR. Se acostumbre usarlo con fromReducer por si existan mas que se llamen reducer.
    // ACR. Esto es para la extension del chrome Redux Devtools Extension
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      // ACR. maxAge Lo que dice es que maneje hasta 25 estados, osea mantenga siempre las ultimas 25 acciones
      // desde que inicia la aplicacion
      maxAge: 25, // Retains last 25 states.
      // ACR. logOnly es para que cuando se encuentre en produccion la aplicacion se puedea impedir que los usuarios
      // que tengan esta extension de Redux Devtools instalada puedan manipular los estados manualmente.
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
