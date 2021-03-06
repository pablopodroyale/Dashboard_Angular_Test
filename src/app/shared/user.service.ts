import { Injectable } from '@angular/core';
import { CreateUserDto } from './Dto/createUserDto.component';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { ServiceResult } from './Response/serviceResult.model';
import { map } from 'rxjs/operators';
import { LoginUserDto } from './Dto/loginUserDto.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URI: string = "https://localhost:44333/";

  constructor(private _http: HttpClient) { }


  Register(userDto: CreateUserDto): Observable<any> {
    let url = this.BASE_URI + "api/User/Register"
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

    // opts.method = "POST";
    // opts.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    return this._http.post(url, userDto, {headers : headers});
      // .pipe(
      //   map((response: Response) => response.json())
      // );
  }

  Login(loginUserDto: LoginUserDto): Observable<any> {
    let url = this.BASE_URI + "api/User/Login"
    let opts: RequestOptions = new RequestOptions();
    opts.method = "POST";
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this._http.post(url, loginUserDto, {headers : headers});
      // .pipe(
      //   map((response: Response) => response.json())
      // );
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }

  getUserProfile() {
    let url = this.BASE_URI + "api/UserProfile";
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

    let opts: RequestOptions = new RequestOptions();
    opts.method = "GET";
    return this._http.get(url, {headers : headers});
      
  }
}
