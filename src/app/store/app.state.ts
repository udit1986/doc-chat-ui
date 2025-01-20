import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from '../core/auth/store/auth.reducer';
import { AuthState, DocumentState } from '../core/models';
import { documentReducer } from './document.reducer';

export interface AppState {
  auth: AuthState;
  document: DocumentState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  document: documentReducer,
};