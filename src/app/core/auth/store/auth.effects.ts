import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, tap } from 'rxjs/operators';
import { TokenStorageService, AuthService } from '../../../shared/services';
import {
  AuthUserActions,
  LoginActions,
  LogoutAction,
  RefreshTokenActions,
  RegisterActions,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly router = inject(Router);
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly tokenStorageService = inject(TokenStorageService);

  readonly login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.request),
      exhaustMap((credentials) =>
        this.authService.login(credentials.email, credentials.password).pipe(
          map((data) => {
            // save tokens
            this.tokenStorageService.saveTokens(
              data.accessToken,
              data.refresh_token
            );
            // trigger login success action
            return LoginActions.success();
          }),
          catchError((error) => of(LoginActions.failure({ error })))
        )
      )
    );
  });

  readonly onLoginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.success),
      map(() => {
        // redirect to return url or home
        this.router.navigateByUrl(
          this.activatedRoute.snapshot.queryParams['returnUrl'] || '/'
        );
        return AuthUserActions.request();
      })
    );
  });

  readonly register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegisterActions.request),
      exhaustMap((credentials) =>
        this.authService
          .register(
            credentials.email,
            credentials.password,
            credentials.firstName,
            credentials.lastName
          )
          .pipe(
            map(() => {
              // trigger register success action
              return RegisterActions.success();
            }),
            catchError((error) => of(RegisterActions.failure({ error })))
          )
      )
    );
  });

  readonly onRegisterSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegisterActions.success),
      tap(() => {
        // redirect to register page on failure
        this.router.navigateByUrl('/auth/login');
      })
    );
  });

  readonly logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LogoutAction),
        exhaustMap(() => {
          this.router.navigateByUrl('/');
          return this.authService
            .logout()
            .pipe(finalize(() => this.tokenStorageService.removeTokens()));
        })
      );
    },
    { dispatch: false }
  );

  readonly getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RefreshTokenActions.success, AuthUserActions.request),
      exhaustMap(() =>
        this.authService.getAuthUser().pipe(
          map((user) => AuthUserActions.success({ user })),
          catchError(() => of(AuthUserActions.failure()))
        )
      )
    );
  });

  readonly refreshToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RefreshTokenActions.request),
      exhaustMap(() =>
        this.authService.refreshToken().pipe(
          map((data) => {
            // save tokens
            this.tokenStorageService.saveTokens(
              data.accessToken,
              data.refresh_token
            );
            // trigger refresh token success action
            return RefreshTokenActions.success();
          }),
          catchError(() => of(RefreshTokenActions.failure()))
        )
      )
    );
  });

  readonly onLoginOrRefreshTokenFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LoginActions.failure, RefreshTokenActions.failure),
        tap(() => this.tokenStorageService.removeTokens())
      );
    },
    { dispatch: false }
  );
}
