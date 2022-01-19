import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'QR';
  public name : string = '';
  public age : number = 0;
  public baseInfo = ' https://covid19-angular.netlify.app';
  public qrInfo = this.baseInfo;

  constructor(route: ActivatedRoute){
    route.queryParams.subscribe((v : any) => {
      console.log('queryParams=', v);
      if (v && v.data) {
        const data = v.data;
        console.log('queryParams data =', data);
        console.log('name =', data.name);
        console.log('age =', data.age);

        const obj = JSON.parse(data);
        console.log('queryParams obj =', obj);
        console.log('name =', obj.name);
        console.log('age =', obj.age);
      }
    });

  }
  changeBase(event : any) : void{
    this.baseInfo = event.target.value;
    this.qrInfo = event.target.value;
    this.combine();
  }
  changeName(event : any) : void{
    this.name = event.target.value;
    this.combine();
  }
  changeAge(event : any) : void{
    this.age = +event.target.value;
    this.combine();
  }
  private combine(): void {
    const data = JSON.stringify({ name: this.name, age: this.age });
    this.qrInfo = this.baseInfo + '?data=' + data;
    console.log('qrInfo=', this.qrInfo);
  }
}
