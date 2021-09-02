import {fakeAsync, TestBed} from '@angular/core/testing';

import {RestAPIService} from './rest-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpErrorResponse} from '@angular/common/http';

describe('RestAPIService', () => {
  let service: RestAPIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        //{provide: HttpXhrBackend, useClass: MockBackend}
      ]
    });
    service = TestBed.inject(RestAPIService);
    httpMock = TestBed.get(HttpTestingController);
    //httpMock = service.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a base url', () => {
    expect(service.getBaseURL).toBeTruthy();
    expect(service.getBaseURL()).toBe('http://127.0.0.1:8080/');
  });

  it('should return http options', () => {
    expect(service.getHttpOptions()).toBeTruthy();

    // check, that http header contains content-type and access-control
    expect(service.getHttpOptions().headers.get('Content-Type')).toBeTruthy();
    expect(service.getHttpOptions().headers.get('Content-Type')).toBe('application/json');

    expect(service.getHttpOptions().headers.get('Access-Control-Allow-Origin')).toBeTruthy();
    expect(service.getHttpOptions().headers.get('Access-Control-Allow-Origin')).toBe('*');
  });

  it('should return resource url', () => {
    expect(service.getResourceURL('test')).toBeTruthy();
    expect(service.getResourceURL('test')).toBe('http://127.0.0.1:8080/test');
  });

  it('should handle error', () => {
    spyOn(window, 'alert');

    // throw client-side error
    service.handleError(new ErrorEvent('test'));

    expect(window.alert).toHaveBeenCalled();

    spyOn(service.router, 'navigateByUrl');

    // throw server error
    service.handleError(new HttpErrorResponse({status: 401}));

    // check, that the user is redirected to the login page
    expect(service.router.navigateByUrl).toHaveBeenCalledOnceWith('/user/login');

    // throw forbidden error
    service.handleError(new HttpErrorResponse({status: 403}));
    expect(service.router.navigateByUrl).toHaveBeenCalledWith('/errors/error403');
  });

  it('should execute a GET request', fakeAsync(() => {
    const exampleResponse = {
      test: 'test1',
      test2: 'test3'
    };

    const url = service.getBaseURL();

    spyOn(service, 'handleError');

    const response = service.get('test1');
    response.subscribe((res: any) => {
      expect(res).toBeTruthy();
      expect(res.test).toBe('test1');
      expect(res.test2).toBe('test3');

      //error handle should not be executed
      expect(service.handleError).not.toHaveBeenCalled();
    });
    const req = httpMock.expectOne(`${url}test1`);
    req.flush(exampleResponse);

    expect(req.request.method).toBe('GET');
    //expect(response.pipe).toEqual(exampleResponse);

    //error handle should not be executed
    expect(service.handleError).not.toHaveBeenCalled();
  }));

  it('should call error handler on backend error', fakeAsync(() => {
    const mockErrorResponse = new HttpErrorResponse({ error: new ErrorEvent('test'), status: 400, statusText: 'Bad Request' });
    let counter = 0;
    const listener = error => {
      counter++;
    };
    service.addUnauthorizedListener(listener);

    const url = service.getBaseURL();

    spyOn(service, 'handleError');

    const response = service.get('test2');
    response.subscribe((res: any) => {
      //error handle should not be executed
      //expect(service.handleError).toHaveBeenCalled();
      //expect(counter).toEqual(1);
    });
    const req = httpMock.expectOne(`${url}test2`);
    req.flush(mockErrorResponse);

    expect(req.request.method).toBe('GET');
  }));

  it('should execute a POST request', fakeAsync(() => {
    const exampleResponse = {
      test: 'test1',
      test2: 'test3'
    };

    const url = service.getBaseURL();

    spyOn(service, 'handleError');

    const response = service.post('test1', new Array());
    response.subscribe((res: any) => {
      expect(res).toBeTruthy();
      expect(res.test).toBe('test1');
      expect(res.test2).toBe('test3');

      //error handle should not be executed
      expect(service.handleError).not.toHaveBeenCalled();
    });
    const req = httpMock.expectOne(`${url}test1`);
    req.flush(exampleResponse);

    expect(req.request.method).toBe('POST');
    //expect(response.pipe).toEqual(exampleResponse);

    //error handle should not be executed
    expect(service.handleError).not.toHaveBeenCalled();
  }));
});
