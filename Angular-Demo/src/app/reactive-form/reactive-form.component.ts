import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  public  name = new FormControl('');
  constructor() { }
  public profileForm = new FormGroup({
    Name: new FormControl(''),
    age: new FormControl(''),
  });
  ngOnInit(): void {
  }
  public updateName(){
    // 
    this.name.setValue("Tran Dung");
  }
  public onSubmit(){
    console.log("Hi")
    console.log(this.profileForm.value['Name'])
    console.log(this.profileForm.value['age'])
    // Cách 1
    console.log(this.profileForm.controls.Name.value)
    console.log(this.profileForm.controls.age.value)
    // Cách 2

  }
}
