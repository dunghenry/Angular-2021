import { Component, OnInit } from '@angular/core';
import { ServerHttpService } from '../Services/server-http.service';
import { CommonService } from './../Services/common.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public age;
  public fullName;
  public title = '';
  public author = '';
  public profiles : any[] = [];
  public posts : any[] = [];

  //? Use Service and ServerHttpService
  constructor(private common: CommonService, private serverHttp: ServerHttpService) {
    this.age = common.age;
    this.fullName = common.fullName;
   }

  ngOnInit(): void {
     //! use getProfile
    this.serverHttp.getProfile().subscribe((data) =>{
      // console.log(data);
      this.profiles = data;
    })

    //! use getPosts
    this.serverHttp.getPosts().subscribe((data) =>{
      // console.log(data)
      this.posts = data
    })
  }

  //! Increase age
  public Increase(){
    this.common.age++;
    this.age = this.common.age;
    if(this.common.age === 21){
      this.common.fullName = "Trần Văn A";
      this.fullName = this.common.fullName;
    }
  }
  
  //? Use addPosts
  public addPost(){
    // console.log(this.title)
    const newData = { title: this.title, author: this.author};
    this.serverHttp.addPosts(newData).subscribe((data)=>{
      // console.log(data);
      this.posts.push(data);
      this.title = '';
      this.author = '';
    })
  }
}
