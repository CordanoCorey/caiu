import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { HttpGetPayload, HttpPostPayload, HttpPutPayload, HttpDeletePayload } from './http.models';
// import { Command } from '../shared/decorators';

@Injectable({
  providedIn: 'root'
})
export class HttpCommands<T> {

  constructor(private http: HttpService) {
  }

  // @Command()
  delete$(payload: HttpDeletePayload<T>): Observable<any> {
    return this.http.delete(payload.path, payload.headers, payload.options);
  }

  // @Command()
  get$(payload: HttpGetPayload<T>): Observable<any> {
    return this.http.get(payload.path, payload.headers, payload.options);
  }

  // @Command()
  post$(payload: HttpPostPayload<T>): Observable<any> {
    return this.http.post(payload.path, payload.model, payload.headers, payload.options);
  }

  // @Command()
  postFormUrlEncoded$(payload: HttpPostPayload<T>): Observable<any> {
    return this.http.postFormUrlEncoded(payload.path, payload.model, payload.headers, payload.options);
  }

  // @Command()
  put$(payload: HttpPutPayload<T>): Observable<any> {
    return this.http.put(payload.path, payload.model, payload.headers, payload.options);
  }

}
