import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  usuario: User;

  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('auth')
    // ACR. Antes de que llegue la informacion primero llega un null y para evitar recibirlo, se usa el pipe para usar el filter.
    .pipe(
      filter(auth => auth.user !== null)
    )
    .subscribe(auth => {
      this.usuario = auth.user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.ingresoEgresoService.cancelarSubcriptions();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
