import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerHttpService {
  private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}
  private REST_API_SERVER = ' http://localhost:3000'
  constructor(private http: HttpClient) { }

  public getProfile(): Observable<any>{
    const url = `${this.REST_API_SERVER}/profile`;
    return this.http
    .get<any>(url, this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  public getComments(): Observable<any>{
    const url = `${this.REST_API_SERVER}/comments`;
    return this.http
    .get<any>(url, this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    console.error('An error occurred:', error.error);
  } else {
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  return throwError(
    'Something bad happened; please try again later.');
}
}
