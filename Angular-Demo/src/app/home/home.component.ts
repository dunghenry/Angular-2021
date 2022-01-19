import { CommonService } from './../Services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public age;
  public fullName = "Trần Văn Dũng";
  public vehicles = ['Toyota', 'Honda', 'Yamaha', 'Nissan', 'Ford'];
  constructor(private common: CommonService) { 
    this.age = common.age;
  }

  ngOnInit(): void {
  }

  public myFunction(){
    this.common.age++;
    this.age = this.common.age;
    // this.vehicles.push(this.fullName)
  }
  public price = 100;
}
