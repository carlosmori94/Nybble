
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  private httpOptionsLogin: any;
  private httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptionsLogin = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  public get<T>(url: string): Observable<any> {
    return this.http
      .get<T>(url, this.httpOptions)
      .pipe(tap(data => this.log(`fetched data`)));
  }

  public post(url: string, object: any): Observable<any> {
    return this.http
      .post<any>(
        url,
        JSON.stringify(object),
        this.httpOptions
      )
      .pipe();
  }


  public put(urlPut: string, object: any): Observable<any> {
    return this.http
      .put(
        urlPut,
        object,
        this.httpOptions
      )
      .pipe(
        tap(_ => this.log(`updated object id=${object.id}`)),
        catchError(this.handleError<any>('putObject'))
      );
  }

  public delete(
    urlDelete: string,
    object?: any
  ): Observable<any> {
    if (object) {
      const id = typeof object === 'number' || typeof object === 'string' ? object : object.id;
      const url = `${urlDelete}/${id}`;

      return this.http
        .delete<any>(url, this.httpOptions)
        .pipe(
          tap(_ => this.log(`deleted object id=${id}`)),
          catchError(this.handleError<any>('deleteObject'))
        );
    } else {
      return this.http
        .delete<any>(
          urlDelete,
          this.httpOptions
        )
        .pipe(tap(data => this.log(`fetched data`)));
    }
  }

  public setAuthHeader() {
    if (localStorage.getItem('authData')) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('authData')
            ? 'Bearer ' + JSON.parse(localStorage.getItem('authData')!).token
            : ''
        })
      };
    }
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      throw error;
    };
  }
  private log(logString: string) {
    console.log(logString);
  }
}