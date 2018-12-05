import { Injectable, EventEmitter } from '@angular/core';
import { Task } from 'app/types';

import { UtilService } from './util.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public tasks: Task[] = [];

  private onChangedEvent: EventEmitter<Task[]>;

  constructor(private utilService: UtilService) {
    this.onChangedEvent = new EventEmitter<Task[]>();
  }

  add(taskName: string) {
    this.tasks.push({ id: this.utilService.generateUniqueId(), name: taskName });
    this.triggerChanged();
  }

  remove(taskId: string) {
    this.tasks = this.tasks.filter((task: Task) => task.id != taskId);
    this.triggerChanged();
  }

  getAll(): Task[] {
    return this.tasks;
  }

  onChange(): Observable<Task[]> {
    return this.onChangedEvent.asObservable();
  }

  fetch(): Observable<Task[]> {
    return new Observable<Task[]>((observer) => {
      let tasks: Task[] = [];
      let localTasks = localStorage.getItem('tasks');
      if (localTasks !== '') {
        tasks = JSON.parse(localTasks);
      }
      observer.next(this.tasks = tasks);
    });
  }

  save(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      observer.next(true);
    });
  }

  private triggerChanged() {
    this.onChangedEvent.emit(this.tasks);
  }

}
