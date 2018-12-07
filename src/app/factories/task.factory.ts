import { Task } from './../types/tasks';
import { UtilService } from './../services/util.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskFactory {

  constructor(private utilService: UtilService) { }

  make(name: string): Task {
    const t = new Task();
    t.id = this.utilService.generateUniqueId();
    t.name = name;
    t.done = false;
    return t;
  }

}
