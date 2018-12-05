import { Component, OnInit, HostListener } from '@angular/core';

import { Board } from 'app/types';
import { TaskService } from 'app/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  boards: Board[];

  constructor(public taskService: TaskService) { }

  ngOnInit() {
    this.boards = this.taskService.restore();
    console.log(this.boards);
  }

  addBoard() {
    this.taskService.addBoard('My board');
  }

  @HostListener('window:unload', ['$event'])
  onPageUnload(event) {
    this.taskService.save();
  }

}
