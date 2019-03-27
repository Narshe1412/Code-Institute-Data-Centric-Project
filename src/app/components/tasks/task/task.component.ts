import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TaskStatus, TasksService, Task, TaskTime } from 'src/app/services/tasks.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { faLock, faHourglassHalf, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import {
  faCheckSquare,
  faSquare,
  faTrashAlt,
  faPlayCircle
} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  faLock = faLock;
  faHourglassHalf = faHourglassHalf;
  faLockOpen = faLockOpen;
  faCheckSquare = faCheckSquare;
  faSquare = faSquare;
  faTrashAlt = faTrashAlt;
  faPlayCircle = faPlayCircle;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() task;
  public statusType: TaskStatus[];
  public isAnimated;
  public expanded = false;
  displayedColumns: string[] = ['time', 'timestamp'];
  dataSource = new MatTableDataSource<TaskTime[]>();
  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.statusType = Object.values(TaskStatus);
    this.dataSource.paginator = this.paginator;
    this.dataSource = new MatTableDataSource<TaskTime[]>(this.task.timeWorked);
  }

  public onSelectStatus(event) {
    console.log(event.target.value);
    this.taskService.updateTaskStatus(this.task.id, event.target.value);
  }

  public advanceStatus() {
    this.taskService.advanceTaskStatus(this.task.id);
  }

  public setTaskStatusTo(newStatus: string) {
    this.taskService.advanceTaskStatus(this.task.id, undefined, newStatus);
  }

  public deleteTask() {
    this.taskService.deleteTask(this.task);
  }

  public getTotalTime() {
    return this.taskService.getTotalTimeFromTask(this.task.id);
  }
}
