import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

import { Task } from 'app/types';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public taskInput: string = '';

  public tasks: Task[] = [
    { id: this.generateUniqueId(), name: 'Sample Task 1', done: false },
    { id: this.generateUniqueId(), name: 'Sample Task 2', done: true },
  ];

  constructor() {
    let localTasks: string = localStorage.getItem('tasks');
    if (localTasks != null)
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  ngOnInit() {
    // pass silently
  }

  saveTask() {
    if (this.taskInput !== '') {
      this.tasks.push({ id: this.generateUniqueId(), name: this.taskInput, done: false });
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.taskInput = '';
    } else {
      alert('Task must not be empty!');
    }
  }

  closeTask(t: Task) {
    this.tasks = this.tasks.filter((task: Task) => task.id != t.id);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private generateUniqueId() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

}
