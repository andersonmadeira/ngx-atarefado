import { Component, OnInit, OnDestroy, HostListener, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Task, Board } from 'app/types';
import { TaskService } from 'app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [
    trigger('taskItemAnimation', [
      state('in', style({ opacity: 1 })),
      // element entering, i.e. created
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      // element destroyed
      transition(':leave', animate(300, style({ opacity: 0 })))
    ])
  ]
})
export class BoardComponent implements OnInit {

  /**
   * Category name
   */
  @Input() board: Board;

  public taskInput = '';

  constructor(private taskService: TaskService) {
    // pass silently
  }

  ngOnInit() {
    // pass silently
  }

  editTask(event: Event, t: Task) {
    const new_name = prompt('Type new name for task: ', t.name);
    if (new_name) {
      t.name = new_name;
    } else if (new_name !== null) {
      alert('Name must not be empty!');
    }
    event.stopImmediatePropagation();
  }

  removeTask(event: Event, t: Task) {
    this.taskService.remove(t, this.board);
    event.stopImmediatePropagation();
  }

  removeBoard() {
    if ( confirm('Are you sure you want to remove the board "' + this.board.name + '" ?') ) {
      this.taskService.removeBoard(this.board.id);
    }
  }

  sortTasks(array: Task[]) {
    array.sort((a: Task, b: Task) => {
      if (a.done < b.done) {
        return -1;
      } else if (a.done > b.done) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  toggleDone(task: Task) {
    task.done = !task.done;
    this.sortTasks(this.board.tasks);
  }

  editBoard() {
    const new_name = prompt('Type a new name for this board: ', this.board.name);
    if (new_name) {
      this.board.name = new_name;
    } else if (new_name !== null) {
      alert('Name must not be empty!');
    }
  }

  addTask() {
    if (this.taskInput !== '') {
      this.taskService.add(this.taskInput, this.board);
      this.taskInput = '';
    } else {
      alert('Task must not be empty!');
    }
  }

}
