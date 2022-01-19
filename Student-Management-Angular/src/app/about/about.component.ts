import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  // public fullName;
  constructor(private common: CommonService, private serverHttp: ServerHttpService) { 
    // this.fullName = common.fullName;
  }

  ngOnInit(): void {
    this.serverHttp.getStudents().subscribe((data) =>{
      // console.log(data);
    })
  }

}
