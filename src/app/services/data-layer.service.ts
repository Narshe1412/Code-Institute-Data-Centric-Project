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

  /**
   * Parses a JSON object containing the mongoDB $oid into the task id field. Then removes this additional information.
   */
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

  /**
   * GET all tasks
   */
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

  /**
   * GET single task by id
   * @param id $oid string
   */
  public getTaskById(id: string): Observable<Task> {
    const url = `${env.apiUrl}/tasks/${id}`;
    return this.http
      .get<Task>(url)
      .pipe(map((taskFromDB: TaskFromDB) => this.addIdToTask(taskFromDB)));
  }

  /**
   * Insert task into the database
   */
  public insertTask(task: Task): Observable<Task> {
    const url = `${env.apiUrl}/tasks`;
    return this.http
      .post<Task>(url, task)
      .pipe(map((taskFromDB: TaskFromDB) => this.addIdToTask(taskFromDB)));
  }

  /**
   * Deletes task from database
   */
  public deleteTask(task: Task): Observable<boolean> {
    interface DeleteTaskResponse {
      deleted_count: number;
    }
    const url = `${env.apiUrl}/tasks/${task.id}`;
    return this.http
      .delete(url)
      .pipe(map((result: DeleteTaskResponse) => result.deleted_count === 1));
  }

  /**
   * Update task from database via PUT
   */
  public updateTask(updatedTask: Task): Observable<Task> {
    const url = `${env.apiUrl}/tasks/${updatedTask.id}`;
    return this.http
      .put<Task>(url, updatedTask)
      .pipe(map((taskFromDB: TaskFromDB) => this.addIdToTask(taskFromDB)));
  }

  /**
   * Add the current timestamp and time to the database
   * @param taskId $oid for the task
   * @param time time in milliseconds
   */
  public addTimeToTask(taskId: string, time: TimeRecord): Observable<boolean> {
    interface AddTimeResponse {
      added: number;
    }
    const url = `${env.apiUrl}/times/${taskId}`;
    return this.http
      .post(url, time)
      .pipe(map((result: AddTimeResponse) => result.added >= 1));
  }

  /**
   * Deletes a time from the task
   * @param taskId $oid for the task
   * @param time TimeRecord object that will be matched in the db
   */
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

  /**
   * Get all the tims for a task
   * @param taskId $oid from the task
   */
  public getAllTimesFromTask(taskId): Observable<TimeRecord[]> {
    const url = `${env.apiUrl}/times/${taskId}`;
    return this.http.get<TimeRecord[]>(url);
  }
}
