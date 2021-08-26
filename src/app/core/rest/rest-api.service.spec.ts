import {TestBed} from '@angular/core/testing';

import {RestAPIService} from './rest-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('RestAPIService', () => {
  let service: RestAPIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ]
    });
    service = TestBed.inject(RestAPIService);
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
});
