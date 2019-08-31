import { TimeRecord } from './../model/ITimeRecord';
import { DataLayerService } from './data-layer.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Task } from '../model/ITask';
import { TaskStatus } from '../model/ITaskStatus';

// These properties are read only or can only be changed by calling their respective methods
const immutableProps = ['id', 'timeWorked', 'visible'];

const ACTIVE_TASK_KEY = 'Taskman-active-task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private currentId = 1;
  private _taskList$: BehaviorSubject<Task[]>;
  private _activeTask$: BehaviorSubject<Task>;

  public get activeTask(): Task {
    return this.activeTask$.getValue();
  }
  public set activeTask(value: Task) {
    this.activeTask$.next(value);
  }

  public get activeTask$(): BehaviorSubject<Task> {
    return this._activeTask$;
  }
  public set activeTask$(value: BehaviorSubject<Task>) {
    this._activeTask$ = value;
  }

  public get taskList$(): BehaviorSubject<Task[]> {
    return this._taskList$;
  }
  public set taskList$(value: BehaviorSubject<Task[]>) {
    this._taskList$ = value;
  }

  public get taskList() {
    return this.taskList$.getValue();
  }
  public set taskList(value) {
    this.taskList$.next(value);
  }

  constructor(private dal: DataLayerService) {
    this.taskList$ = new BehaviorSubject<Task[]>([]);
    this.activeTask$ = new BehaviorSubject<Task>(null);
    this.loadAllTasksInSystem();
  }

  public getNextId() {
    return this.currentId++;
  }

  public loadAllTasksInSystem() {
    this.dal.getAllTasks().subscribe(tasks => {
      this.taskList$.next(tasks);
      const activeTask = this.getActiveTaskInLocalStorage();
      if (activeTask) {
        const isTaskInDB = this.taskList.find(
          task => task.id.toString() === activeTask
        );
        if (isTaskInDB) {
          this.activeTask$.next(isTaskInDB);
        } else {
          this.removeActiveTaskFromLocalStorage();
        }
      }
    });
  }

  public addTask(
    title: string,
    reference: any,
    description = ''
  ): Promise<Task> {
    if (title && reference) {
      const newTask: Task = {
        id: null,
        title,
        reference,
        description,
        timeWorked: [],
        status: TaskStatus.Todo,
        visible: true
      };
      return this.dal
        .insertTask(newTask)
        .toPromise()
        .then(res => {
          this.taskList.push(res);
          this.taskList$.next(this.taskList);
          return res;
        });
    }
  }

  public getTaskById(id: string) {
    return this.dal.getTaskById(id).toPromise();
  }

  public deleteTask(task?: Task, id?: string) {
    console.log(
      'TCL: TasksService -> deleteTask -> task?: Task, id?: string',
      task,
      id
    );
    const foundtaskIndex = this.taskList.findIndex((t: Task) => {
      if (id) {
        return t.id === id;
      } else if (task && task.id) {
        return t.id === task.id;
      } else if (task && task.id && task.id.length === 0) {
        return (
          t.reference === task.reference &&
          t.description === task.description &&
          t.title === task.title
        );
      }
    });
    console.log(
      'TCL: TasksService -> deleteTask -> foundtaskIndex',
      foundtaskIndex
    );
    console.log(
      'TCL: TasksService -> deleteTask -> this.taskList',
      this.taskList
    );
    if (this.taskList[foundtaskIndex]) {
      this.dal
        .deleteTask(this.taskList[foundtaskIndex])
        .toPromise()
        .then(res => {
          if (res === true) {
            this.taskList.splice(foundtaskIndex, 1);
            this.taskList$.next(this.taskList);
          }
        });
    }
  }

  public deleteTaskById(id: string) {
    if (id) {
      this.deleteTask(null, id);
    }
  }

  public updateTaskById(id: string, contents: {}) {
    const emptyTask: Task = {
      id: '',
      title: '',
      reference: '',
      description: '',
      timeWorked: [],
      status: TaskStatus.Todo,
      visible: true
    };
    Object.keys(contents).forEach(prop => {
      if (!emptyTask.hasOwnProperty(prop) || immutableProps.includes(prop)) {
        delete contents[prop];
      }
    });
    const foundtaskIndex = this.taskList.findIndex(
      (task: Task) => task.id === id
    );
    if (foundtaskIndex >= 0) {
      this.dal
        .updateTask({
          ...this.taskList[foundtaskIndex],
          ...contents
        })
        .toPromise()
        .then(res => {
          this.taskList[foundtaskIndex] = res;
          this.taskList$.next(this.taskList);
        });
    }
    return this.taskList;
  }

  public advanceTaskStatus(
    id: string,
    tasklist = this.taskList,
    status?: string
  ) {
    const statusList: TaskStatus[] = [
      TaskStatus.Todo,
      TaskStatus.InProgress,
      TaskStatus.Done,
      TaskStatus.Archived
    ];
    const taskIndex = tasklist.findIndex(task => task.id === id);
    if (status && TaskStatus[status]) {
      tasklist[taskIndex].status = status as TaskStatus;
    } else if (!status) {
      const taskstatus = tasklist[taskIndex].status;
      let newStatus = statusList.indexOf(taskstatus);
      newStatus =
        newStatus >= statusList.length - 1 ? newStatus : newStatus + 1;
      tasklist[taskIndex].status = statusList[newStatus];
    }
    this.dal
      .updateTask(this.taskList[taskIndex])
      .toPromise()
      .then(res => {
        this.taskList$.next(tasklist);
      });
  }

  public updateTaskStatus(
    id: string,
    newStatus: TaskStatus,
    tasklist = this.taskList
  ) {
    // Test if newStatus is a value from the TaskStatus enum.
    if (Object.values(TaskStatus).includes(newStatus)) {
      // Find the matching task using the id
      const taskIndex = tasklist.findIndex(x => x.id === id);
      if (taskIndex >= 0) {
        // Only update if task exists
        tasklist[taskIndex].status = newStatus;
        this.dal
          .updateTask(tasklist[taskIndex])
          .toPromise()
          .then(res => {
            // Force update the observable
            this.taskList$.next(tasklist);
          });
      }
    }
  }

  public addTimeToTask(id: string, time: number, tasklist = this.taskList) {
    time = Math.abs(time);
    const taskIndex = tasklist.findIndex(x => x.id === id);
    if (taskIndex >= 0) {
      const record: TimeRecord = { timestamp: Date.now(), amount: time };
      this.dal
        .addTimeToTask(id, record)
        .toPromise()
        .then(res => {
          if (res) {
            tasklist[taskIndex].timeWorked.push(record);
            this.taskList$.next(tasklist);
          }
        });
    }
  }

  public getTotalTimeFromTask(id: string, tasklist = this.taskList): number {
    let totalTime = -1;
    const taskIndex = tasklist.findIndex(x => x.id === id);
    if (taskIndex >= 0) {
      totalTime = tasklist[taskIndex].timeWorked.reduce(
        (total, current) => (total += current.amount),
        0
      );
    }
    return totalTime;
  }

  public setActiveTaskById(id: string, tasklist = this.taskList) {
    let success = false;
    const foundTask = tasklist.find((task: Task) => task.id === id);
    if (foundTask) {
      this.setActiveTaskInLocalStorage(foundTask.id);
      this.activeTask = foundTask;
      success = true;
    }
    return success;
  }

  public removeActiveTask() {
    let success = false;
    if (this.activeTask) {
      this.removeActiveTaskFromLocalStorage();
      this.activeTask = null;
      success = true;
    }
    return success;
  }

  private setActiveTaskInLocalStorage(taskId) {
    localStorage.setItem(ACTIVE_TASK_KEY, taskId);
  }

  private getActiveTaskInLocalStorage() {
    return localStorage.getItem(ACTIVE_TASK_KEY);
  }

  private removeActiveTaskFromLocalStorage() {
    localStorage.removeItem(ACTIVE_TASK_KEY);
  }
}
