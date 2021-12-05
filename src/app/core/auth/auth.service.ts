import { Injectable } from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {AuthResult} from './auth-result';
import {UserCredentials} from './user-credentials';
import {RestAPIService} from '../rest/rest-api.service';
import {PermissionService} from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private res: Observable<AuthResult>;
  private loginListener: (() => void)[] = [];
  private logoutListener: (() => void)[] = [];

  private accessTokenName = 'anman_access_token';
  private mockRequest = false;

  // see also: https://www.positronx.io/angular-jwt-user-authentication-tutorial/

  constructor(private restApiService: RestAPIService,
              private permissionService: PermissionService) {
    restApiService.addUnauthorizedListener(this.handleUnauthorizedError);
  }

  public login(credentials: UserCredentials): Observable<AuthResult> {
    if (typeof credentials.username=='undefined' || !credentials.username) {
      throw new Error('username is empty');
    }

    console.log('try to login ' + credentials.username);
    this.res = new Observable<AuthResult>((observer) => {
      const authResult = new AuthResult();

      if (this.mockRequest) {
        sessionStorage.setItem(this.accessTokenName, 'test-token');
        return;
      }

      // tslint:disable-next-line:max-line-length
      this.restApiService.post<any>('api/login', credentials)
        .pipe(
          catchError((err, caught) => {
            console.warn('catchError: ' + err);

            authResult.success = false;
            observer.next(authResult);
            observer.complete();
            return throwError(() => new Error('login failed'));
          })
        )
        .subscribe((data: any) => {
          sessionStorage.setItem(this.accessTokenName, data.token);
          localStorage.setItem(this.accessTokenName, data.token); // only save this, if the token should be kepted after session closed
          console.log('logged in successfully');

          authResult.success = true;

          observer.next(authResult);
          observer.complete();

          this.loginListener.forEach((listener: () => void) => {
            listener.apply(null);
          });
        });
    });

    return this.res;
  }

  logout() {
    sessionStorage.removeItem(this.accessTokenName);
    const removeToken = localStorage.removeItem(this.accessTokenName);
    /*if (removeToken == null) {
      this.router.navigate(['log-in']);
    }*/

    this.logoutListener.forEach((listener: () => void) => {
      listener.apply(null);
    });

    //remove all permissions of the user
    this.permissionService.cleanUp();
  }

  public getAccessTokenName(): string {
    return this.accessTokenName;
  }

  public getToken() {
    let token: string;

    token = localStorage.getItem(this.accessTokenName);

    if (token == null) {
      token = sessionStorage.getItem(this.accessTokenName);
    }

    return token;
  }

  get isLoggedIn(): boolean {
    const authToken = this.getToken();
    return (authToken !== null) ? true : false;
  }

  public addLoginListener(listener: () => void) {
    this.loginListener.push(listener);
  }

  public addLogoutListener(listener: () => void) {
    this.logoutListener.push(listener);
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      alert(error.error.message);
    } else {
      if (error.status === 404) {
        /* login credentials are wrong */
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        window.alert(errorMessage);
      }
    }
    return throwError(() => new Error(errorMessage));
  }

  handleUnauthorizedError(error) {
    /* set user as logged off */
    this.logout();
  }

  public setMockRequest(flag: true) {
    this.mockRequest = flag;
  }

  public getPermissionService(): PermissionService {
    return this.permissionService;
  }

}
