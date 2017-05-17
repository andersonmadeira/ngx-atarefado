import { Component, OnInit, trigger, transition, style, animate, state } from '@angular/core';

@Component({
  selector: 'app-task-list',
  animations: [
    trigger('taskStateAnimation', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public taskInput: string = '';

  public items = [
    {id: this.generateUniqueId(), name: 'Buy food', checked: false, active: 'active'},
    {id: this.generateUniqueId(), name: 'Meet Jimmy Hendrix', checked: true, active: 'active'},
    {id: this.generateUniqueId(), name: 'Study for the test', checked: false, active: 'active'},
    {id: this.generateUniqueId(), name: 'Buy a car', checked: false, active: 'active'},
    {id: this.generateUniqueId(), name: 'Read the news', checked: true, active: 'active'},
    {id: this.generateUniqueId(), name: 'Get up', checked: true, active: 'active'}
  ]

  constructor() { 
    console.log(this.items);
  }

  newTask() {
    this.items.push({ id: this.generateUniqueId(), name: this.taskInput, checked: false, active: 'active'});
    this.taskInput = '';
  }

  closeTask(task) {
    let index: number = 0;
    for (let item of this.items) {
      if (item.id == task.id) {
        console.log(item);
        return !(item.active = task.active = 'inactive');
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
