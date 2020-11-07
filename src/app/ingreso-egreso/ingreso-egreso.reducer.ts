import { Action, createReducer, on } from '@ngrx/store';
import * as IngresoEgresoActions from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';

export interface IngresoEgresoState {
  items: IngresoEgreso[];
}

export const initialState: IngresoEgresoState = {items: []};

const ingresosEgresosReducer = createReducer(
  initialState,
  on(IngresoEgresoActions.SET_ITEMS, (state, {items}) => {
    return {
      items: [ // ACR. Para evitar pasar por referencia se hace así
        ...items.map(item => {
          return {
            ...item
          };
        })
      ]
    };
  }),
  on(IngresoEgresoActions.UNSET_ITEMS, (state) => {
    return {items: []};
  })
);

export function ingresoEgresoReducer(state: IngresoEgresoState, action: Action): IngresoEgresoState {
  return ingresosEgresosReducer(state, action);
}
