import { BoardFactory } from './../factories/board.factory';
import { Injectable, EventEmitter } from '@angular/core';
import { Task, Board } from 'app/types';

import { UtilService } from './util.service';
import { Observable } from 'rxjs';
import { TaskFactory } from 'app/factories';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public boards: Board[] = [];

  constructor(private utilService: UtilService, private taskFactory: TaskFactory, private boardFactory: BoardFactory) { }

  add(taskName: string, board: Board) {
    board.tasks.push(this.taskFactory.make(taskName));
  }

  remove(task: Task, board: Board) {
    board.tasks = board.tasks.filter((t: Task) => t.id !== task.id);
  }

  getBoards(): Board[] {
    return this.boards;
  }

  restore(): Board[] {
    let boards: Board[] = [];
    let localBoards = localStorage.getItem('boards');
    console.log(localBoards);
    if (localBoards) {
      boards = JSON.parse(localBoards);
    }
    return this.boards = boards;
  }

  save() {
    localStorage.setItem('boards', JSON.stringify(this.boards));
  }

  getBoard(boardId: string): Board | null {
    return this.boards.find((board: Board) => board.id === boardId);
  }

  removeBoard(boardId: string) {
    this.boards = this.boards.filter((board: Board) => board.id !== boardId);
  }

  addBoard(name: string, tasks: Task[] = []): Board {
    let board = this.boardFactory.make(name, tasks);
    console.log(this.boards);
    this.boards.push(board);
    return board;
  }

}
