import { ActionReducerMap } from '@ngrx/store/src'; // ACR. ActionReducerMap para fusionar varios reducers en uno solo.
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface AppState {
  ui: fromUI.UiState;
  auth: fromAuth.AuthState;
}

// ACR. Creado para que contenga todos los reducer y no tener que llamarlos de a uno en el app.module en el StoreModule.forRoot.
export const reducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
};
