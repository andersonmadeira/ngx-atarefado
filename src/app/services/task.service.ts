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

  private onBoardsChangedEvent: EventEmitter<Board[]>;

  constructor(private utilService: UtilService, private taskFactory: TaskFactory, private boardFactory: BoardFactory) {
    this.onBoardsChangedEvent = new EventEmitter<Board[]>();
  }

  onBoardsChanged(): Observable<Board[]> {
    return this.onBoardsChangedEvent.asObservable();
  }

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
    const localBoards = localStorage.getItem('boards');
    let boards: Board[] = [];

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
    this.triggerBoardsChanged();
  }

  triggerBoardsChanged() {
    this.onBoardsChangedEvent.emit(this.boards);
  }

  addBoard(name: string, tasks: Task[] = []): Board {
    const board = this.boardFactory.make(name, tasks);
    this.boards.push(board);
    this.triggerBoardsChanged();
    return board;
  }

}
