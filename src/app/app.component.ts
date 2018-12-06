import { Component, OnInit, HostListener } from '@angular/core';

import { Board } from 'app/types';
import { TaskService } from 'app/services';
import { state, trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('boardAnimation', [
      state('in', style({ opacity: 1 })),
      // element entering, i.e. created
      transition(':enter', [
        style({ opacity: 0 }),
        animate(200)
      ]),
      // element destroyed
      transition(':leave', animate(200, style({ opacity: 0 })))
    ])
  ]
})
export class AppComponent implements OnInit {

  boards: Board[];

  constructor(public taskService: TaskService) { }

  ngOnInit() {
    this.boards = this.taskService.restore();
    console.log(this.boards);

    this.taskService.onBoardsChanged().subscribe( (boards: Board[]) => {
      this.boards = boards;
      console.log("Boards changed to: ", this.boards);
    });
  }

  addBoard() {
    this.taskService.addBoard('My board');
  }

  @HostListener('window:unload', ['$event'])
  onPageUnload(event) {
    this.taskService.save();
  }

}
