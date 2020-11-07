import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const SET_USER = createAction('[AUTH] Set User', props<{user: User}>());
export const UNSET_USER = createAction('[AUTH] Unset User');
