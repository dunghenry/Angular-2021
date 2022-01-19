import { ServerHttpService } from './../Services/server-http.service';
import { CommonService } from './../Services/common.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public age;
  public Age = ""
  public Name = ""
  public male =""
  public id = ""
  public cmt = ""
  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService) {
    this.age = common.age;
   }
  ngOnInit(): void {
    this.serverHttp.getProfile().subscribe((data =>{
      console.log(data)
      this.Name = data.name
      this.Age = data.age
      this.male = data.gender
    }))
    this.serverHttp.getComments().subscribe((data =>{
      this.id = data[0].id
      this.cmt = data[0].body
      // console.log(data[0].id)
      // console.log(data)
    }))
  }
  public myFunction(){
    this.common.age++;
    this.age = this.common.age;

  }
}
