// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  public students:any = [];
  public query: any;
  constructor(private common: CommonService, private serverHttp: ServerHttpService,  private router: Router) { 
  this.query = common.query
  }

  ngOnInit(): void {
    this.serverHttp.getStudents().subscribe((data) =>{
      this.students = data;
      console.log(data);
    })
  }
  public deleteStudent(studentId: any){
    console.log(studentId);
    this.serverHttp.deleteStudent(studentId).subscribe((data) =>{
      this.students = data;
      this.router.navigate(['/students'])
      .then(() => {
        window.location.reload();
      });
    })
    
  }
  public editStudent(student: any){
    // const navigationExtras: NavigationExtras = {state: {student: student}};
    // this.router.navigate(['addstudent/' + student.id], navigationExtras);
  }

}
