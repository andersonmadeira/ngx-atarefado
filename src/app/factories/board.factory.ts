import { Board, Task } from 'app/types';
import { UtilService } from './../services/util.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardFactory {

  constructor(private utilService: UtilService) { }

  make(name: string, tasks: Task[] = []): Board {
    let b = new Board();
    b.id = this.utilService.generateUniqueId();
    b.name = name;
    b.tasks = tasks;
    return b;
  }

}
