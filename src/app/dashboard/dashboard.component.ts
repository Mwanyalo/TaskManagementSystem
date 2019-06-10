import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

import { TaskService } from '../_services/task.service';
import { Task } from '../_models/task';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('btnClose') btnClose: ElementRef;
  @ViewChild('taskForm') taskForm: NgForm;

  toDoTask: Task[] = [];
  inProgressTask: Task[] = [];
  completedTask: Task[] = [];
  model = new Task();

  constructor(public taskService: TaskService) {
  }

  ngOnInit() {
    this.taskService.getUID();
    this.getTasks();
  }

  getTasks() {
    this.toDoTask = [];
    this.inProgressTask = [];
    this.completedTask = [];

    this.taskService.getTasks().subscribe((data: any) => {
      const allTasks = data;

      allTasks.filter(element => {
        if (element.status === 0) {
          this.toDoTask.push(element);
        } else if (element.status === 1) {
          this.inProgressTask.push(element);
        } else {
          this.completedTask.push(element);
        }
      });
    }, error => {
      console.log('error on get Tasks', error);
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    const task = event.item.data;
    // first check if it was moved within the same list or moved to a different list
    if (event.previousContainer === event.container) {
      // change the items index if it was moved within the same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {

      if (event.container.id === 'cdk-drop-list-0') {
        task.status = 0;
        this.taskService.updateTask(task).subscribe(data => {
          this.getTasks();
        });
      } else if (event.container.id === 'cdk-drop-list-1') {
        task.status = 1;
        this.taskService.updateTask(task).subscribe(data => {
          this.getTasks();
        });
      } else {
        task.status = 2;
        this.taskService.updateTask(task).subscribe(data => {
          this.getTasks();
        });
      }
      // remove item from the previous list and add it to the new array
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  saveTask() {
    if (this.model.id == null) {
      this.taskService.createTask(this.model).subscribe(data => {
        this.getTasks();
        this.model = new Task();
        this.btnClose.nativeElement.click();
      });
    } else {
      this.taskService.updateTask(this.model).subscribe(data => {
        this.getTasks();
        this.model = new Task();
        this.btnClose.nativeElement.click();
      });
    }

  }

  editTask(task) {
    this.model = task;
  }

  deleteTask(taskId) {
    this.taskService.deleteTask(taskId).subscribe(data => {
      console.log('delete data success');
      this.getTasks();
    });
  }

}
