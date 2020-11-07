import { ActionReducerMap } from '@ngrx/store/src'; // ACR. ActionReducerMap para fusionar varios reducers en uno solo.
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
  ui: fromUI.UiState;
  auth: fromAuth.AuthState;
  ingresoEgreso: fromIngresoEgreso.IngresoEgresoState;
}

// ACR. Creado para que contenga todos los reducer y no tener que llamarlos de a uno en el app.module en el StoreModule.forRoot.
export const reducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer
};
