import { TimeRecord } from './../model/ITimeRecord';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Task, TaskFromDB } from '../model/ITask';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {
  constructor(private http: HttpClient) {}

  private addIdToTask(taskFromDB: TaskFromDB): Task {
    if (taskFromDB._id && taskFromDB._id.$oid) {
      const id = taskFromDB._id.$oid;
      delete taskFromDB._id.$oid;
      delete taskFromDB._id;
      return { ...taskFromDB, id };
    } else {
      return taskFromDB;
    }
  }

  public getAllTasks(): Observable<Task[]> {
    const url = `${env.apiUrl}/tasks`;
    return this.http.get<Task[]>(url).pipe(
      map((tasksFromDB: TaskFromDB[]) => {
        return tasksFromDB.map((taskFromDB: TaskFromDB) =>
          this.addIdToTask(taskFromDB)
        );
      })
    );
  }

  public getTaskById(id: string): Observable<Task> {
    const url = `${env.apiUrl}/tasks/${id}`;
    return this.http
      .get<Task>(url)
      .pipe(map((taskFromDB: TaskFromDB) => this.addIdToTask(taskFromDB)));
  }

  public insertTask(task: Task): Observable<Task> {
    const url = `${env.apiUrl}/tasks`;
    return this.http
      .post<Task>(url, task)
      .pipe(map((taskFromDB: TaskFromDB) => this.addIdToTask(taskFromDB)));
  }

  public deleteTask(task: Task): Observable<boolean> {
    interface DeleteTaskResponse {
      deleted_count: number;
    }
    const url = `${env.apiUrl}/tasks/${task.id}`;
    console.log('TCL: DataLayerService -> constructor -> task.id', task.id);
    return this.http
      .delete(url)
      .pipe(map((result: DeleteTaskResponse) => result.deleted_count === 1));
  }

  public updateTask(updatedTask: Task): Observable<Task> {
    const url = `${env.apiUrl}/tasks/${updatedTask.id}`;
    return this.http
      .put<Task>(url, updatedTask)
      .pipe(map((taskFromDB: TaskFromDB) => this.addIdToTask(taskFromDB)));
  }

  public addTimeToTask(taskId: string, time: TimeRecord): Observable<boolean> {
    interface AddTimeResponse {
      added: number;
    }
    const url = `${env.apiUrl}/times/${taskId}`;
    return this.http
      .post(url, time)
      .pipe(map((result: AddTimeResponse) => result.added >= 1));
  }

  public deleteTimeFromTask(
    taskId: number,
    time: TimeRecord
  ): Observable<boolean> {
    interface DeleteTimeResponse {
      removed: number;
    }
    const url = `${env.apiUrl}/times/${taskId}`;
    return this.http
      .post(url, time)
      .pipe(map((result: DeleteTimeResponse) => result.removed >= 1));
  }

  public getAllTimesFromTask(taskId): Observable<TimeRecord[]> {
    const url = `${env.apiUrl}/times/${taskId}`;
    return this.http.get<TimeRecord[]>(url);
  }
}
