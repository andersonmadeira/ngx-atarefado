import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Task } from 'app/types';
import { TaskService } from 'app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
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
export class TaskListComponent implements OnInit {

  public taskInput: string = '';
  public tasks: Task[];

  constructor(private taskService: TaskService) {
    // pass silently
  }

  ngOnInit() {
    this.taskService.onChange().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      console.log(tasks);
    });
  }

  @HostListener('window:load', ['$event'])
  onPageLoad(event) {
    this.taskService.fetch().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      console.log("Fetched tasks: ", tasks);
    });
  }

  @HostListener('window:unload', ['$event'])
  onPageUnload(event) {
    this.taskService.save().subscribe((success: boolean) => {
      console.log("Saved tasks: ", success);
    })
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

  addTask() {
    if (this.taskInput !== '') {
      this.taskService.add(this.taskInput);
      this.taskInput = '';
    } else {
      alert('Task must not be empty!');
    }
  }

  removeTask(taskId: string) {
    this.taskService.remove(taskId);
  }

}
