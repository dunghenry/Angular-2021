import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  public name = new FormControl('');
  public profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  constructor() { }

  ngOnInit(): void {
  }
  public updateName(){
    this.name.setValue('Trần Văn Dũng');
  }
  public onSubmit(){
    console.warn(this.profileForm.value.firstName);
    console.warn(this.profileForm.value.lastName);
  }
}
