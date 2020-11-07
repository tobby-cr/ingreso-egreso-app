import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  usuario: User;

  private subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
