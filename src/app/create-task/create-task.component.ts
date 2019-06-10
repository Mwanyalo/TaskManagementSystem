import { Component, OnInit } from '@angular/core';
import { Task } from '../_models/task';
import { TaskService } from '../_services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  model = new Task();

  constructor(public taskService: TaskService) { }

  ngOnInit() { }

  addTask() {
    this.taskService.createTask(this.model).subscribe(data => {
      console.log('data on task creation', data);
    });
  }

}
