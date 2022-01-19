import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-for-loop',
  templateUrl: './for-loop.component.html',
  styleUrls: ['./for-loop.component.scss']
})
export class ForLoopComponent implements OnInit {
  public works = ["Công việc 1", "Công việc 2", "Công việc 3", "Công việc 4"];
  constructor() { }

  ngOnInit(): void {
  }
  public Addworks(){
    this.works.push("Công việc 5", "Công việc 6", "Công việc 7");
  }

}
