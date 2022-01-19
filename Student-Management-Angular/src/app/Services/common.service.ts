import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public totalStudents = 0;
  public query = 0;
  public totalStudents$ = new BehaviorSubject<number>(0);
  public students: any[] = [];
  constructor() { }

  public setTotalStudents(total: number) {
    this.totalStudents = total;
    this.totalStudents$.next(total);
  }
}
