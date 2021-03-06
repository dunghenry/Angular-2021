import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServerHttpService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
      // Authorization: 'my-auth-token',
      // Authorization: 'Basic ' + btoa('username:password'),
    }),
  };

  private REST_API_SERVER = 'https://api.covid19api.com';

  constructor(private httpClient: HttpClient) {}

  public getAll() {
    const url = `${this.REST_API_SERVER}`;
    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  public getSummary() {
    const url = `${this.REST_API_SERVER}/summary`;
    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getUSData() {
    const url = `${this.REST_API_SERVER}/live/country/US`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => error)
  }
}
