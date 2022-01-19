import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';
import {ActivatedRoute, Navigation, Router} from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.scss']
})
export class AddStudentsComponent implements OnInit {
  public students : any = [];
  public id = '';
  public code = '';
  public fullName = '';
  public gender: any;
  public email = '';
  public phone = '';
  public rule = true;
  example: string;
  public query : any;
  constructor(private serverHttp: ServerHttpService, private common: CommonService, private router: Router, private route: ActivatedRoute) {
    this.students = common.students;
    this.query = common.query;
    console.log(this.query);
    let navigation = this.router.getCurrentNavigation();
    let state = navigation.extras.state as {student: any};
    console.log(state)

      // this.id = state.student.id;
      // if(this.id !== '0'){
      //   this.code = state.student.code;
      //   this.fullName = state.student.fullName;
      //   this.gender = state.student.gender;
      //   this.email = state.student.email;
      //   this.phone = state.student.phone;

      // }
   }

  ngOnInit(): void {
    
    
  }
  public onSubmit(){
    if(this.rule == true){
      this.gender = "Nam";
    }
    if(this.rule == false){
      this.gender = "Nữ";
    }
    const newData = {
      "id": this.id,
      "code": this.code,
      "gender": this.gender,
      "fullName": this.fullName,
      "email": this.email,
      "phone": this.phone
    }
    
    this.serverHttp.addStudent(newData).subscribe((data)=>{
        // console.log(data);
        this.students.push(data);
        this.id = '';
        this.code = '';
        this.fullName = '';
        this.email = '';
        this.phone = '';
        this.gender = '';
      })
      this.router.navigate(['/students'])
      .then(() => {
        window.location.reload();
      });
    
  }
  

}
