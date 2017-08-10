import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public taskInput: string = '';

  private subs: Array<any> = [];

  public items = [
    {id: this.generateUniqueId(), name: 'Sample task 1', checked: false, active: true},
    {id: this.generateUniqueId(), name: 'Sample task 2', checked: true, active: true},
  ]

  constructor() {
    let localTasks = localStorage.getItem('tasks');
    console.log(localTasks);
    if ( localTasks != null )
      this.items = JSON.parse(localStorage.getItem('tasks'));
  }

  newTask() {
    this.items.push({ id: this.generateUniqueId(), name: this.taskInput, checked: false, active: true});
    localStorage.setItem('tasks', JSON.stringify(this.items));
    this.taskInput = '';
  }

  closeTask(task) {
    let index: number = 0;
    for (let item of this.items) {
      if (item.id == task.id) {
        let timer = TimerObservable.create(500, 1000);
        item.active = false;
        this.subs.push(
          { 'source': item.id,
            'sub': timer.subscribe(t => {
              this.items.splice(index, 1);
              let i = 0;
              for (let s of this.subs) {
                if (s.id == item.id) {
                  this.subs[i].sub.unsubscribe();
                  this.subs.splice(i, 1);
                  break;
                }
                i++;
              }
            })
          }
        );
        return;
      }
      index += 1;
    }
    // this.items = this.items.filter(obj => { return obj.id != task.id });
  }

  private generateUniqueId() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
  }

  ngOnInit() {
  }

}
