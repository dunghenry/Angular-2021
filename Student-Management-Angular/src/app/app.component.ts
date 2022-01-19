import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonService } from './Services/common.service';
import { ServerHttpService } from './Services/server-http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public query: any;
  title = 'Student-Management-Angular';
  @ViewChild('sidenav') public sidenav: any;
  public isOpened = false;
  public totalStudents = 0;

  constructor( private common: CommonService,
    private serverHttp: ServerHttpService){
      this.query = common.query;

  }
  ngOnInit(): void {
    this.common.totalStudents$.subscribe((total) => {
      this.totalStudents = total;
    });
    if (this.common.totalStudents === 0) {
      this.serverHttp.getStudents().subscribe((data) => {
        this.common.setTotalStudents(data.length);
      });
    }

  }
  closeLeftSide(){
    this.isOpened = false;
  }
  openLeftSide(){
    this.isOpened = !this.isOpened;
    this.sidenav.toggle();
  }
}
