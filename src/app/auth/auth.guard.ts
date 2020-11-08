import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { logWarnings } from 'protractor/built/driverProviders';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuth();
  }

  // canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //   throw new Error('Method not implemented.');
  // }

  // ACR. Como regresa un observable la ejecuta y regresa el valor, pero queda escuchando posibles cambios, por lo tanto se debe
  // cancelar la suscripcion y lo que se necesita es que se ejecute una nueva instancia cuando se quiere entrar a la ruta, porque
  // el modulo no se encuentra cargado. Tambien se podria colocar el take en el canActivate(), pero como siempre el modulo se encuentra
  // cargado se revisa el mismo modulo con el mismo objeto.
  // canLoad(): Observable<boolean> {
  //   return this.authService.isAuth().pipe(
  //     take(1) // ACR. take para indicarle que emita una sola notificación y luego cancele la suscripcion.
  //   );
  // }

  // ACR. Lo de arriba es para el error que cuando se logea no hace nada y si se va a dashboard se ve la pagina en blanco, pero como a mi
  // no me paso no lo hago así. Parece que en esta version de Angular ya no pasa.
  canLoad(): Observable<boolean> {
    return this.authService.isAuth();
  }

}
