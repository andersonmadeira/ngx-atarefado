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

  titleEditable: boolean = false;

  @ViewChild('editTitleInput')
  editTitleInput: ElementRef;

  public taskInput: string = '';

  constructor(private taskService: TaskService) {
    // pass silently
  }

  ngOnInit() {
    // pass silently
  }

  editTask(event: Event, t: Task) {
    let new_name = prompt("Type new name for task: ");
    if (new_name) {
      t.name = new_name;
    } else if (new_name !== null) {
      alert('Name must not be empty!');
    }
    event.stopImmediatePropagation();
  }

  removeBoard() {
    this.taskService.removeBoard(this.board.id);
  }

  editBoard() {
    this.editTitleInput.nativeElement.value = this.board.name;
    this.titleEditable = !this.titleEditable;
    console.log(this.editTitleInput);
    if (this.titleEditable)
      setTimeout(() => this.editTitleInput.nativeElement.focus(), 0); // setTimeout cuz element is still hidden: https://goo.gl/UkFXTi
  }

  editBoardDone(new_name: string) {
    this.board.name = new_name;
    this.titleEditable = false;
  }

  addTask() {
    if (this.taskInput !== '') {
      this.taskService.add(this.taskInput, this.board);
      this.taskInput = '';
    } else {
      alert('Task must not be empty!');
    }
  }

  removeTask(task: Task) {
    this.taskService.remove(task, this.board);
  }

}
