import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  reference: string;
  description: string;
  timeWorked: TaskTime[];
  status: 'todo' | 'in progress' | 'done' | 'archived';
  visible?: boolean;
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
  private _taskList;
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

  public addTask(title: string, reference: any, description: string): Task {
    if (title && reference && description) {
      const newTask: Task = {
        id: this.getNextId(),
        title,
        reference,
        description,
        timeWorked: [],
        status: 'todo',
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
    const foundtaskIndex = this.taskList.findIndex((t: Task) =>
      id ? t.id === id : task.id === t.id
    );
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
      status: 'todo',
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
}
