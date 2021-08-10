import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subscription, of, throwError } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  tap
} from "rxjs/operators";

import { HttpActions } from "./http.actions";
import { HttpOptions } from "./http.models";
import { QueryModel } from "../shared/models";
import { serialize } from "../shared/utils";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  private _authToken = "";
  private _baseUrl = "";
  private authTokenChanges: Subscription;
  private baseUrlChanges: Subscription;
  headers = {};
  logEvents = false;
  useDefaultHeaders = true;

  constructor(
    public http: HttpClient,
    private baseUrl$: Observable<string>,
    private authToken$: Observable<string>
  ) {
    this.authTokenChanges = this.authToken$.subscribe(x => {
      this.authToken = x;
    });
    this.baseUrlChanges = this.baseUrl$.subscribe(x => {
      this.baseUrl = x;
    });
  }

  get authToken(): string {
    return this._authToken;
  }

  set authToken(value: string) {
    this._authToken = value;
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  set baseUrl(value: string) {
    this._baseUrl = value;
  }

  get defaultHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-type", "application/json");
    if (this.authToken) {
      headers = headers.append("Authorization", "Bearer " + this.authToken);
    }
    return headers;
  }

  get requestHeaders(): HttpHeaders {
    let headers: HttpHeaders = this.useDefaultHeaders
      ? this.defaultHeaders
      : new HttpHeaders();
    Object.keys(this.headers).forEach(key => {
      headers = headers.append(key, this.headers[key]);
    });
    return headers;
  }

  appendHeaders(headers = {}): HttpHeaders {
    let requestHeaders = this.requestHeaders;
    Object.keys(headers).forEach(key => {
      requestHeaders = requestHeaders.append(key, this.headers[key]);
    });
    return requestHeaders;
  }

  /**
   * Make a DELETE request.
   * @param relativePath
   * @param headers
   * @param options
   */
  delete(
    relativePath: string,
    headers = {},
    options: HttpOptions = new HttpOptions()
  ): Observable<any> {
    const url = options.prependBaseUrl
      ? this.formatUrl(relativePath)
      : relativePath;
    const httpHeaders = this.appendHeaders(headers);
    const obs = this.http.delete(url, {
      headers: httpHeaders
    });
    return obs.pipe(
      map(res =>
        res && res["json"] && typeof res["json"] === "function"
          ? res["json"]()
          : res
      ),
      catchError(err => this.onError(err.error)),
      finalize(() => {
        this.onComplete("DELETE", url);
      })
    );
  }

  /**
   * Make a GET request.
   * @param relativePath
   * @param headers
   * @param options
   */
  get(
    relativePath: string,
    headers = {},
    options: HttpOptions = new HttpOptions()
  ): Observable<any> {
    const url = options.prependBaseUrl
      ? this.formatUrl(relativePath)
      : relativePath;
    const httpHeaders = this.appendHeaders(headers);
    const obs = this.http.get(url, {
      headers: httpHeaders
    });
    return obs.pipe(
      map(res => {
        return res && res["json"] && typeof res["json"] === "function"
          ? res["json"]()
          : res;
      }),
      catchError(err => this.onError(err ? err.error : err)),
      finalize(() => {
        this.onComplete("GET", url);
      })
    );
  }

  /**
   * Make a GET request.
   * @param relativePath
   * @param headers
   * @param options
   */
  getValue(relativePath: string): Observable<any> {
    const url = this.formatUrl(relativePath);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-type", "text/plain");
    if (this.authToken) {
      headers = headers.append("Authorization", "Bearer " + this.authToken);
    }
    const obs = this.http.get(url, {
      headers
    });
    return obs
      // .pipe(
      //   tap(x => {
      //     console.log(x);
      //   }),
      //   catchError(err => this.onError(err ? err.error : err)),
      //   finalize(() => {
      //     this.onComplete("GET", url);
      //   })
      // )
      ;
  }

  /**
   * Make a GET request.
   * @param fullPath
   * @param headers
   * @param options
   */
  getFullPath(
    fullPath: string,
    headers = {},
    options: HttpOptions = new HttpOptions()
  ): Observable<any> {
    return this.get(
      fullPath,
      headers,
      Object.assign({}, options, { prependBaseUrl: false })
    );
  }

  /**
   * Make an autocomplete GET request.
   * @param relativePath
   * @param headers
   * @param options
   */
  autocomplete(
    relativePath: string,
    query: QueryModel<any>,
    headers = {},
    options: HttpOptions = new HttpOptions()
  ): Observable<any> {
    if (!query.term || query.term.length < 1) {
      return of([]);
    }
    const path = `${relativePath}/${QueryModel.BuildQueryString(query)}`;
    const url = options.prependBaseUrl
      ? this.formatUrl(relativePath)
      : relativePath;
    const httpHeaders = this.appendHeaders(headers);
    const obs = this.http.get(url, {
      headers: httpHeaders
    });
    return obs.pipe(
      map(res =>
        res && res["json"] && typeof res["json"] === "function"
          ? res["json"]()
          : res
      ),
      debounceTime(500),
      distinctUntilChanged(),
      map(json => HttpActions.matchPath(path, json)),
      catchError(err => this.onError(err ? err.error : err)),
      finalize(() => {
        this.onComplete("GET", url);
      })
    );
  }

  /**
   * Make a POST request.
   * @param relativePath
   * @param body
   * @param headers
   * @param options
   */
  post(
    relativePath: string,
    body: any,
    headers = {},
    options: HttpOptions = new HttpOptions()
  ): Observable<any> {
    const url = options.prependBaseUrl
      ? this.formatUrl(relativePath)
      : relativePath;
    const httpHeaders = this.appendHeaders(headers);
    const obs = this.http.post(url, serialize(body), {
      headers: httpHeaders
    });
    return obs.pipe(
      map(res =>
        res && res["json"] && typeof res["json"] === "function"
          ? res["json"]()
          : res
      ),
      catchError(err => {
        return this.onError(err ? err.error : err);
      }),
      finalize(() => {
        this.onComplete("POST", url);
      })
    );
  }

  /**
   * Make a POST request with form url-encoded content type.
   * @param relativePath
   * @param body
   * @param headers
   * @param options
   */
  postFormUrlEncoded(
    relativePath: string,
    body: any,
    headers = {},
    options: HttpOptions = new HttpOptions()
  ): Observable<any> {
    const url = options.prependBaseUrl
      ? this.formatUrl(relativePath)
      : relativePath;
    const httpHeaders = new HttpHeaders({
      "content-type": "application/x-www-form-urlencoded"
    });
    const obs = this.http.post(url, body, {
      headers: httpHeaders
    });
    return obs.pipe(
      map(res =>
        res && res["json"] && typeof res["json"] === "function"
          ? res["json"]()
          : res
      ),
      catchError(err => this.onError(err)),
      finalize(() => {
        this.onComplete("POST FORM URL-ENCODED", url);
      })
    );
  }

  /**
   * Make a PUT request.
   * @param relativePath
   * @param body
   * @param headers
   * @param options
   */
  put(
    relativePath: string,
    body: any,
    headers = {},
    options: HttpOptions = new HttpOptions()
  ): Observable<any> {
    const url = options.prependBaseUrl
      ? this.formatUrl(relativePath)
      : relativePath;
    const httpHeaders = this.appendHeaders(headers);
    const obs = this.http.put(url, serialize(body), {
      headers: httpHeaders
    });
    return obs.pipe(
      map(res => {
        return res && res["json"] && typeof res["json"] === "function"
          ? res["json"]()
          : res;
      }),
      catchError(err => {
        return this.onError(err ? err.error : err);
      }),
      finalize(() => {
        this.onComplete("PUT", url);
      })
    );
  }

  /**
   * This method will be used to format URLs for all cross-origin requests.
   */
  formatUrl(path: string): string {
    return `${this.baseUrl}/${path}`;
  }

  /**
   * Use this method when a promise is preferred over an observable.
   */
  getPromise(url: string) {
    return this.get(url)
      .toPromise()
      .then(res => res.json());
  }

  private onError(error: any) {
    console.log(error);
    // let errorBody: any;
    // try {
    //   errorBody = error._body
    //     ? JSON.parse(error._body)
    //     : { message: 'Internal server error', statusCode: error.status };
    // } catch (e) {
    //   if (error.status <= 0) {
    //     errorBody = { message: 'Internal server error.', statusCode: 500 };
    //   }
    // }
    // if (errorBody.message) {
    //   errorBody.message = errorBody.message.replace(
    //     'An error has occured in the api.System.Exception: ',
    //     ''
    //   );
    //   errorBody.message = errorBody.message.substring(
    //     0,
    //     errorBody.message.indexOf(' at')
    //   );
    // }
    return throwError({
      message:
        error && error.Message
          ? error.Message
          : "An error occurred in the API.",
      statusCode: error && error.Code ? error.Code : null
    });
  }

  private onComplete(method: string, url: string): void {
    if (this.logEvents) {
      console.log(`Completed ${method} request to ${url}`);
    }
  }
}
