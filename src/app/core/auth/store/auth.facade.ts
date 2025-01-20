import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { LogoutAction, LoginActions, AuthUserActions, RegisterActions } from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  readonly authUser$ = this.store.select(AuthSelectors.selectAuthUser);
  readonly isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
  readonly isLoadingLogin$ = this.store.select(
    AuthSelectors.selectIsLoadingLogin
  );
  readonly hasLoginError$ = this.store.select(AuthSelectors.selectLoginError);

  login(email: string, password: string) {
    this.store.dispatch(LoginActions.request({ email, password }));
  }

  register(email: string, password: string, firstName: string, lastName: string) {
    this.store.dispatch(
      RegisterActions.request({ email, password, firstName, lastName })
    );
  }

  logout() {
    this.store.dispatch(LogoutAction());
  }

  getAuthUser() {
    this.store.dispatch(AuthUserActions.request());
  }
}
