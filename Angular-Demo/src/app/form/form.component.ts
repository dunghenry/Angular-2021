import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public name="";
  public password = "";
  public vehicles = ['Toyota', 'Honda', 'Yamaha', 'Nissan', 'Ford'];
  private selectedVehicle = '';
  
  constructor() { }
  ngOnInit(): void {
  }
  public mySelect(event:any) {
    // console.log('selectVehicle', event.target.value);
    this.selectedVehicle = event.target.value;
  }
  public onSubmit(){
    console.log("Name: " + this.name);
    console.log("Password: " + this.password);
    console.log("Vehicle: " + this.selectedVehicle);
  }
  
}
