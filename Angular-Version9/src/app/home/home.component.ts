import { CommonService } from './../Services/common.service';
import { Component, OnInit } from '@angular/core';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public fullName;
  public age = 20;
  //Cách 1
  // public data = [{
  //   "id": Number,
  //   "body": String,
  //   "postId": Number,

  // }];

  //Cách 2
  public data = null;

  constructor(private common: CommonService, private serverHttp: ServerHttpService) { 
    this.age = common.age;
    this.fullName = common.fullName;
  }

  ngOnInit(): void {
    this.serverHttp.getComments().subscribe((data) =>{
        this.data = data;
        // console.log(this.data);
    })
  }

  public Increase(){
    this.common.age++;
    this.age = this.common.age;
    
    if(this.common.age == 21){
      this.common.fullName = "Nguyễn Văn A";
      this.fullName = this.common.fullName;
    }
    
  }

}
