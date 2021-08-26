import { TestBed } from '@angular/core/testing';

import { RestAPIService } from './rest-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('RestAPIService', () => {
  let service: RestAPIService;
  let  httpMock: HttpTestingController;

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
});
