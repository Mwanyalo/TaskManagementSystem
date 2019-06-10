import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../_models/task';
import { appConfig } from '../app.config';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public uid: any;

  constructor(private http: HttpClient) {}

  getUID() {
    const user = JSON.parse(localStorage.getItem('userId'));
    this.uid = user.id;
  }

  createTask(task: Task) {
    return this.http.post<Task>(appConfig.apiUrl + `tasks/${this.uid}`, task);
  }

  updateTask(task: Task) {
    return this.http.put<Task>(appConfig.apiUrl + `tasks/${this.uid}/${task.id}`, task);
  }

  deleteTask(id: number) {
    return this.http.delete<Task>(appConfig.apiUrl + `tasks/${this.uid}/${id}`);
  }

  getTask(pid) {
    return this.http.get<Task>(appConfig.apiUrl + `tasks/${this.uid}/${pid}`);
  }

  getTasks() {
    return this.http.get<Task>(appConfig.apiUrl + `tasks/${this.uid}`);
  }


}
