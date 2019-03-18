import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  reference: string;
  description: string;
  timeWorked: TaskTime[];
  status: TaskStatus;
  visible?: boolean;
}

export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'in progress',
  Done = 'done',
  Archived = 'archived'
}

// These properties are read only or can only be changed by calling their respective methods
const immutableProps = ['id', 'timeWorked', 'visible'];

export interface TaskTime {
  amount: number;
  timestamp: number;
}

const mockTaskList = [
  {
    id: 0,
    title: 'This is a title',
    reference: '1111',
    description: 'This is a description',
    timeWorked: [
      { amount: 1312000, timestamp: 2321313131 },
      { amount: 1312000, timestamp: 2321313131 },
      { amount: 1312000, timestamp: 2321313131 }
    ]
  },
  {
    id: 1,
    title: 'This is the second title',
    reference: '22ND',
    description: 'This is a new description',
    timeWorked: []
  },
  {
    id: 2,
    title: 'This is the third title',
    reference: '33AF',
    description: 'This is a description',
    timeWorked: [
      { amount: 33, timestamp: 2321313131 },
      { amount: 99, timestamp: 2321313131 },
      { amount: 1113231312, timestamp: 2321313131 }
    ]
  },
  {
    id: 4,
    title: 'This is a new task',
    reference: '33AF',
    description: 'This is a description',
    timeWorked: [
      { amount: 99999, timestamp: Date.now() },
      { amount: 1312000, timestamp: Date.now() },
      { amount: 1312000, timestamp: Date.now() }
    ]
  }
];

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private currentId = 1;
  private _taskList: Task[];
  private _taskList$: BehaviorSubject<Task[]>;

  public get taskList$(): BehaviorSubject<Task[]> {
    return this._taskList$;
  }
  public set taskList$(value: BehaviorSubject<Task[]>) {
    this._taskList$ = value;
  }

  public get taskList() {
    return this._taskList;
  }
  public set taskList(value) {
    this._taskList = value;
  }

  constructor() {
    this.taskList$ = new BehaviorSubject<Task[]>([]);
    this.taskList = [];
  }

  public getNextId() {
    return this.currentId++;
  }

  public addTask(title: string, reference: any, description = ''): Task {
    if (title && reference) {
      const newTask: Task = {
        id: this.getNextId(),
        title,
        reference,
        description,
        timeWorked: [],
        status: TaskStatus.Todo,
        visible: true
      };
      this.taskList.push(newTask);
      this.taskList$.next(this.taskList);
      return newTask;
    }
  }

  public deleteTask(task?: Task, id?: number) {
    if (this.taskList.length === 0) {
      return [];
    }
    const foundtaskIndex = this.taskList.findIndex((t: Task) => {
      if (id) {
        return t.id === id;
      } else if (task) {
        return (
          t.reference === task.reference &&
          t.description === task.description &&
          t.title === task.title
        );
      }
    });
    if (foundtaskIndex >= 0) {
      this.taskList.splice(foundtaskIndex, 1);
      this.taskList$.next(this.taskList);
    }
    return this.taskList;
  }

  public deleteTaskById(id: number) {
    if (id) {
      this.deleteTask(null, id);
    }
  }

  public updateTaskById(id: number, contents: {}) {
    const emptyTask: Task = {
      id: 0,
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
    const foundtaskIndex = this.taskList.findIndex((task: Task) => task.id === id);
    if (foundtaskIndex >= 0) {
      this.taskList[foundtaskIndex] = { ...this.taskList[foundtaskIndex], ...contents };
      this.taskList$.next(this.taskList);
    }
    return this.taskList;
  }

  public advanceTaskStatus(id: number, tasklist = this.taskList) {
    const status: TaskStatus[] = [
      TaskStatus.Todo,
      TaskStatus.InProgress,
      TaskStatus.Done,
      TaskStatus.Archived
    ];
    const taskIndex = tasklist.findIndex(x => x.id === id);
    const taskstatus = tasklist[taskIndex].status;
    let newStatus = status.indexOf(taskstatus);
    newStatus = newStatus >= status.length - 1 ? newStatus : ++newStatus;
    tasklist[taskIndex].status = status[newStatus];
    this.taskList$.next(tasklist);
  }

  public updateTaskStatus(id: number, newStatus: TaskStatus, tasklist = this.taskList) {
    // Test if newStatus is a value from the TaskStatus enum.
    if (Object.values(TaskStatus).includes(newStatus)) {
      // Find the matching task using the id
      const taskIndex = tasklist.findIndex(x => x.id === id);
      if (taskIndex >= 0) {
        // Only update if task exists
        tasklist[taskIndex].status = newStatus;
        // Force update the observable
        this.taskList$.next(tasklist);
      }
    }
  }

  public addTimeToTask(id: number, time: number, tasklist = this.taskList) {
    time = Math.abs(time);
    const taskIndex = tasklist.findIndex(x => x.id === id);
    if (taskIndex >= 0) {
      tasklist[taskIndex].timeWorked.push({ amount: time, timestamp: Date.now() });
      this.taskList$.next(tasklist);
    }
  }

  public getTotalTimeFromTask(id: number, tasklist = this.taskList): number {
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
}
