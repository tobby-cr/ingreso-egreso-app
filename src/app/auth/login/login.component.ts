import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  private subscription: Subscription;

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  ngOnInit(): void {
    // ACR. Como el ngOnInit se ejecuta mas de una vez, la suscripcion la asigno a una variable de tipo Subscription para
    // poder desuscribirme cuando el componente sea destruido.
    this.subscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
  }

  onSubmit(data: any): void {
    // console.log(data);
    this.authService.login(data.email, data.password);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
