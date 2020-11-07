import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from './user.model';

export interface AuthState {
  user: User;
}

export const initialState: AuthState = {user: null};

const authsReducer = createReducer(
  initialState,
  on(AuthActions.SET_USER, (state, {user}) => {
    return { // ACR. Se retorna algo de tipo AuthState.
      user: {
        ... user // ACR. Se usa el "... user" para extraer todas las propiedades del parametro user y no tener que hacerlo de a una.
      }
    };
  }),
  on(AuthActions.UNSET_USER, (state) => {
    return {
      user: null
    };
  })
);

export function authReducer(state: AuthState, action: Action): AuthState {
  return authsReducer(state, action);
}

