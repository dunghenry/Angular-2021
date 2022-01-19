import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public age = 20;
  public fullName = "Trần Văn Dũng";
  constructor() { }
  // public Increase(){
  //   this.age++;
  //   if(this.age == 21){
  //     this.fullName = "Nguyễn Văn A";
  //   }
    
  // }
}
