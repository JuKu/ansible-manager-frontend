import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  isMockAPI = false;

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Access-Control-Allow-Origin': '*'
    })
  };

  /**
   * list with listeners for unauthorized errors, e.q. to logout user.
   */
  private unauthorizedListener: ((error) => void)[] = [];

  constructor(private http: HttpClient,
              private router: Router) {
    //
  }

  /**
   * get the base url of the backend.
   *
   * @return http base url for backend
   */
  public getBaseURL(): string {
    return environment.backendApiUrl;
  }

  /**
   * get the http options, e.q. the requested response type.
   *
   * @return http client options
   */
  public getHttpOptions() {
    return this.httpOptions;
  }

  public getResourceURL(resource: string): string {
    return this.getBaseURL() + resource;
  }

  /**
   * send a GET request.
   * See also: https://nichola.dev/generic-approach-to-consume-rest-api/
   *
   * @param resource http resource, e.q. "user/list"
   * @param parameters optional parameters
   *
   * @return Observable http response oberservable
   */
  public get<T>(resource: string, parameters: any = new Map()): Observable<any> {
    // TODO: build query url with parameters

    return this.http.get<T>(this.getResourceURL(resource), this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      if (error.status === 401) {
        // unauthorized - logout user and go to login page
        this.router.navigateByUrl('/user/login');

        // TODO: logout user in UserService

        this.unauthorizedListener.forEach((listener: (error) => void) => {
          listener.apply(error);
        });

        return throwError(() => new Error('not logged in'));
      } else if (error.status === 403) {
        // forbidden
        this.router.navigateByUrl('/errors/error403');
      }

      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}
