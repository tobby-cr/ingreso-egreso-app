import { Action, createReducer, on } from '@ngrx/store';
import * as UIActions from './ui.actions';

export interface UiState {
  isLoading: boolean;
}

export const initialState: UiState = {isLoading: false};

const uisReducer = createReducer(
  initialState,
  on(UIActions.ACTIVAR_LOADING, (state) => {
    return {isLoading: true};
  }),
  on(UIActions.DESACTIVAR_LOADING, (state) => {
    return {isLoading: false};
  })
);

export function uiReducer(state: UiState, action: Action): UiState {
  return uisReducer(state, action);
}
