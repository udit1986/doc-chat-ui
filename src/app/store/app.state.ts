import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from '../core/auth/store/auth.reducer';
import { AuthState } from '../core/models';

export interface AppState {
  auth: AuthState;
  // other feature states
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  // other reducers
};