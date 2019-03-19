import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TaskStatus, TasksService, Task, TaskTime } from 'src/app/services/tasks.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() task;
  public statusType: TaskStatus[];
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

  public getTotalTime() {
    return this.taskService.getTotalTimeFromTask(this.task.id);
  }
}
