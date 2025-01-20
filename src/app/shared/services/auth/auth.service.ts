import { APP_INITIALIZER, Injectable, Provider, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { TokenStorageService } from '../storage';
import { RefreshTokenActions } from '../../../core/auth/store/auth.actions';
import * as AuthSelectors from '../../../core/auth/store/auth.selectors';
import { RestApiService } from '../restapi/restapi.service';
import { AuthApiEndpoint } from './auth.endpoint';
import { AuthState, AuthUser, TokenStatus } from '../../../core/models';

export interface AccessData {
  token_type: 'Bearer';
  expiresIn: number;
  accessToken: string;
  refresh_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly store = inject(Store);
  private readonly tokenStorageService = inject(TokenStorageService);

  constructor(private restApiService: RestApiService) {}

  /**
   * Returns a promise that waits until
   * refresh token and get auth user
   *
   * @returns {Promise<AuthState>}
   */
  init(): Promise<AuthState> {
    this.store.dispatch(RefreshTokenActions.request());

    const authState$ = this.store.select(AuthSelectors.selectAuth).pipe(
      filter(
        (auth) =>
          auth.refreshTokenStatus === TokenStatus.INVALID ||
          (auth.refreshTokenStatus === TokenStatus.VALID && !!auth.user)
      ),
      take(1)
    );

    return lastValueFrom(authState$);
  }

  /**
   * Performs a request with user credentials
   * in order to get auth tokens
   *
   * @param {string} email
   * @param {string} password
   * @returns Observable<AccessData>
   */
  public login(email: string, password: string): Observable<AccessData> {
    return this.restApiService
      .postData(AuthApiEndpoint.AUTH_LOGIN_DATA_POST, {
        email,
        password,
      })
      .pipe(map((response: any) => response.data));
  }

  /**
   * Performs a request with user information
   * in order to create new user
   *
   * @param {string} email
   * @param {string} password
   * @param {string} firstName
   * @param {string} lastName
   * @returns Observable<AccessData>
   */
  public register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<AccessData> {
    return this.restApiService.postData(
      AuthApiEndpoint.AUTH_REGISTER_DATA_POST,
      {
        email,
        password,
        firstName,
        lastName,
      }
    );
  }

  /**
   * Performs a request for logout authenticated user
   *
   * @returns Observable<boolean>
   */
  public logout(): Observable<boolean> {
    return this.restApiService.postData(
      AuthApiEndpoint.AUTH_LOGOUT_DATA_POST,
      {}
    );
  }

  /**
   * Asks for a new access token given
   * the stored refresh token
   *
   * @returns {Observable<AccessData>}
   */
  refreshToken(): Observable<AccessData> {
      return throwError(() => new Error('Refresh token does not exist'));

    //TODO: implement refresh token logic
  
  }

  /**
   * Returns authenticated user
   * based on saved access token
   *
   * @returns {Observable<AuthUser>}
   */
  public getAuthUser(): Observable<AuthUser> {
    return this.restApiService.getData(AuthApiEndpoint.AUTH_DATA_GET)
    .pipe(map((response: any) => response.data));
  }
}

export const authServiceInitProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: (authService: AuthService) => () => authService.init(),
  deps: [AuthService],
  multi: true,
};
