import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  public BASE_URL: string;
  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  constructor(private httpClient: HttpClient) {
    this.BASE_URL = environment.serverUrl;
  }

  public get(path: string, params = new HttpParams()): Observable<any> {
    return this.httpClient.get(this.BASE_URL + path, {params});
  }

  public post(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + path, JSON.stringify(body), this.options);
  }

  public put(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + path, JSON.stringify(body), this.options);
  }

  public delete(path: string): Observable<any> {
    return this.httpClient.delete(this.BASE_URL + path);
  }

}
