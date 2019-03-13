import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

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
    return 1;
  }

  public addTask(title, reference, description) {
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
  }
}

export interface Task {
  id: number;
  title: string;
  reference: string;
  description: string;
  timeWorked: TaskTime[];
  status: 'todo' | 'in progress' | 'done' | 'archived';
  visible?: boolean;
}

export interface TaskTime {
  amount: number;
  timestamp: number;
}
