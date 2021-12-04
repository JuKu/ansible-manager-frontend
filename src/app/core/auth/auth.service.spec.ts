import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';

//see also: https://stackoverflow.com/questions/47236963/no-provider-for-httpclient
// Http testing module and mocking controller
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

// Other imports
import {HttpClient} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {UserCredentials} from './user-credentials';
import {Observable} from 'rxjs';
import {AuthResult} from './auth-result';
import {RestAPIService} from '../rest/rest-api.service';

describe('AuthService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule],
      providers: [{
        provide: RestAPIService,
        useValue: jasmine.createSpyObj('RestAPIService', ['post', 'addUnauthorizedListener'])
      }],
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login()', () => {
    it('should throw an error on empty username', () => {
      const userCredentials: UserCredentials = new UserCredentials('', '');
      expect(() => service.login(userCredentials)).toThrowError(Error);
    });

    it('should return an AuthResult', () => {
      //const serviceMock = jasmine.createSpy('RestAPIService', 'post');
      const res: Observable<AuthResult> = service.login(new UserCredentials('test', 'test1'));
      expect(res).toBeTruthy();
    });
  });

  describe('logout()', () => {
    it('should remove the access token', () => {
      localStorage.setItem(service.getAccessTokenName(), 'test-token');
      expect(localStorage.getItem(service.getAccessTokenName())).toBe('test-token');

      //add empty logout listener for test
      service.addLogoutListener(() => {});

      //logout, which should remove the access token
      service.logout();

      expect(localStorage.getItem(service.getAccessTokenName())).toBeNull();
      expect(sessionStorage.getItem(service.getAccessTokenName())).toBeNull();
      expect(service.getToken()).toBeNull();
    });
  });
});
