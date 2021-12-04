import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

//see also: https://stackoverflow.com/questions/47236963/no-provider-for-httpclient
// Http testing module and mocking controller
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

// Other imports
import {HttpClient} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {zip} from 'rxjs';
import {AuthService} from './auth.service';
import {RestAPIService} from '../rest/rest-api.service';
import {LoginComponent} from '../../features/user/login/login.component';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('AuthGuard', () => {
  const restService = jasmine.createSpyObj<RestAPIService>('RestAPIService', ['addUnauthorizedListener']);

  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let serviceStub: Partial<AuthService>;
  const dummyRoute = {} as ActivatedRouteSnapshot;

  //see also: https://dev.to/this-is-angular/testing-angular-route-guards-with-the-routertestingmodule-45c9
  const fakeUrls = ['/', '/admin', '/crisis-center', '/a/deep/route'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: LoginComponent
          }
        ])],
      providers: [
        // Use the power of Angular DI with following provider. This will replace SortService with MockSortService in injector
        //{ provide: SortService, useClass: MockSortService },
      ]
    });
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    serviceStub = {};
    guard = new AuthGuard(serviceStub as AuthService, routerSpy);
    //realGuard = new AuthGuard(authServiceStub as AuthService, routerSpy);
  });

  describe('when the user is logged in', () => {
    beforeEach(() => {
      // @ts-ignore
      serviceStub.isLoggedIn = true;
    });

    fakeUrls.forEach((fakeUrl: string) => {
      it('grants access', () => {
        const isAccessGranted = guard.canActivate(null, null);
        expect(isAccessGranted).toBeTrue();
      });

      it('it grants route access', () => {
        const canActivate = guard.canActivate(dummyRoute, fakeRouterState(fakeUrl));
        expect(canActivate).toBeTrue();
      });

      it('it grants child route access', () => {
        const canActivateChild = guard.canActivateChild(dummyRoute, fakeRouterState(fakeUrl));
        expect(canActivateChild).toBeTrue();
      });
    });
  });

  describe('when the user is logged out', () => {
    beforeEach(() => {
      // @ts-ignore
      serviceStub.isLoggedIn = false;
    });

    fakeUrls.forEach((fakeUrl: string) => {
      it('rejects access', () => {
        const isAccessGranted = guard.canActivate(null, null);
        expect(isAccessGranted).toBeFalse();
      });

      it('rejects child route access', () => {
        const canActivateChild = guard.canActivateChild(dummyRoute, fakeRouterState(fakeUrl));
        expect(canActivateChild).toBeFalse();
      });

      it('rejects load access', () => {
        const canLoad = guard.canLoad(null, null);
        expect(canLoad).toBeFalse();
      });

      it('navigates to the login page', () => {
        guard.canActivate(null, null);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
      });
    });
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
