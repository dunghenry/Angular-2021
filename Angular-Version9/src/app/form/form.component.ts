import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public name ='';
  public password = '';
  public vehicles = ["Mazda", "Mercedes", "Volvo", "BMW"];
  public vehicle = '';
  constructor() { }

  ngOnInit(): void {
  }
  public onSubmit() {
    console.log(this.name)
    console.log(this.password)
    console.log(this.vehicle);
  }
  public selectedVehicle(e: any){
    // console.log(e)
    // console.log(e.target.value);
    this.vehicle = e.target.value;
  }

}
