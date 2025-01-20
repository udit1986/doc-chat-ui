import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { AuthUser } from '../../models/auth.model';

// Login
export const LoginActions = createActionGroup({
  source: 'Auth: Login',
  events: {
    request: props<{ email: string; password: string }>(),
    success: emptyProps(),
    failure: props<{ error: Error }>(),
  },
});

// Register
export const RegisterActions = createActionGroup({
  source: 'Auth: Register',
  events: {
    request: props<{
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }>(),
    success: emptyProps(),
    failure: props<{ error: Error }>(),
  },
});

// Logout
export const LogoutAction = createAction('[Auth] Logout');

// Auth User: me
export const AuthUserActions = createActionGroup({
  source: 'Auth: Auth User',
  events: {
    request: emptyProps(),
    success: props<{ user: AuthUser }>(),
    failure: emptyProps(),
  },
});

// Refresh token
export const RefreshTokenActions = createActionGroup({
  source: 'Auth: Refresh Token',
  events: {
    request: emptyProps(),
    success: emptyProps(),
    failure: emptyProps(),
  },
});
