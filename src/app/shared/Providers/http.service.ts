import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: Http) { }

  getHttp() : Http
  {
    return this._http;
  }
  
}
