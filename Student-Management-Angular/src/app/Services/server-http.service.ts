import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Student } from '../models/Students';

@Injectable({
  providedIn: 'root'
})
export class ServerHttpService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
      // Authorization: 'Basic ' + btoa('username:password'),
    }),

  };
  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}
  public getStudents() {
    const url = `${this.REST_API_SERVER}/students`;
    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  public getStudent(studentId: any) {
    const url = `${this.REST_API_SERVER}/addstudent/` + studentId;
    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public addStudent(data: Student){
    const url = `${this.REST_API_SERVER}/students`;
    return this.httpClient.post<any>(url, data, this.httpOptions).pipe(catchError(this.handleError));
  }

  public deleteStudent(studentId: number){
    const url = `${this.REST_API_SERVER}/students/` + studentId;
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
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
