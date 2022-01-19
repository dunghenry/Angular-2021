import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public age = 10;
  public myFunction(){
    this.age++;
    // this.vehicles.push(this.fullName)
  }
  constructor() { }
}
