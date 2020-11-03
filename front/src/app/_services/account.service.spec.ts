import { TestBed, getTestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { AccountService } from './account.service';
import { User } from '../_models/user';

describe('AccountService', () => {
  let service: AccountService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    });
    service = TestBed.inject(AccountService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should be create observable<User[]>', () => {
    const service:AccountService = TestBed.get(AccountService);

    let post: User = {
      "id": null,
      "firstName": "mel2",
      "lastName": "patiño",
      "username": "mel2",
      "password": "carv77",
      "role": "user",
      "idCampus": 1,
      "token": null
    };

    let reponse = {
      "message": "Registration successful"
    };

    service.register(post).subscribe((response: any) => {
      expect(response).toEqual(reponse);
    });

    let serviceProvider: string = 'http://localhost:4000/users/register';
    let req = httpMock.expectOne(serviceProvider);
    expect(req.request.method).toBe("POST");

    req.flush(reponse);
    httpMock.verify();
  });

  it('should be login user', () => {
    const service:AccountService = TestBed.get(AccountService);

    let post = {
      "username": "candres",
      "password": "carv77"
    };

    let reponse = {
      "id": 2,
      "firstName": "Cesar",
      "lastName": "Ramirez",
      "username": "candres",
      "role": "admin",
      "idCampus": null,
      "createdAt": "2020-10-29T13:28:21.000Z",
      "updatedAt": "2020-10-29T13:28:21.000Z",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTYwMzk3ODExNywiZXhwIjoxNjA0NTgyOTE3fQ.4p-0zJsqDGF0hFbmt-2Xa0BxwMLTdpH8hm6yveCuGPs"
    };

    service.login(post.username, post.password).subscribe((response: any) => {
      expect(response).toEqual(reponse);
    });

    let serviceProvider: string = 'http://localhost:4000/users/authenticate';
    let req = httpMock.expectOne(serviceProvider);
    expect(req.request.method).toBe("POST");

    req.flush(reponse);
    httpMock.verify();
  });

  it('should be reurn  List<User>', () => {
    const service:AccountService = TestBed.get(AccountService);

    let reponse = [
      {
        "id": 1,
        "firstName": "Homer",
        "lastName": "Simpson",
        "username": "homer",
        "role": "user",
        "idCampus": 1,
        "createdAt": "2020-10-29T13:27:37.000Z",
        "updatedAt": "2020-10-29T13:27:37.000Z"
      },
      {
        "id": 2,
        "firstName": "Cesar",
        "lastName": "Ramirez",
        "username": "candres",
        "role": "admin",
        "idCampus": 1,
        "createdAt": "2020-10-29T13:28:21.000Z",
        "updatedAt": "2020-10-29T13:28:21.000Z"
      }];

    service.getAll().subscribe((response: any) => {
      expect(response).toEqual(reponse);
    });

    let serviceProvider: string = 'http://localhost:4000/users';
    let req = httpMock.expectOne(serviceProvider);
    expect(req.request.method).toBe("GET");

    req.flush(reponse);
    httpMock.verify();
  });


});
