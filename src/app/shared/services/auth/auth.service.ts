import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestApiService } from '../restapi/restapi.service';
import { AuthApiEndpoint } from './auth.endpoint';
import { AuthUser } from '../../../core/models';

@Injectable()
export class AuthService {
  constructor(private restApiService: RestApiService) {}

  public getAuthUser(
  ): Observable<AuthUser> {
    return this.restApiService
      .getData(AuthApiEndpoint.AUTH_DATA_GET)
      .pipe(map((result: any): AuthUser => result));
  }
  public login(
    username: string, password: string
  ): Observable<boolean> {
    return this.restApiService
      .postData(
        AuthApiEndpoint.AUTH_LOGIN_DATA_POST,
        { username, password }
      )
      .pipe(map((result: any): boolean => result));
  }
  public logout(
  ): Observable<boolean> {
    return this.restApiService
      .postData(
        AuthApiEndpoint.AUTH_LOGOUT_DATA_POST,
        {}
      )
      .pipe(map((result: any): boolean => result));
  }
}
