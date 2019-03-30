import { TasksService } from 'src/app/services/tasks.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TaskTimerListDataSource } from './task-timer-list-datasource';

@Component({
  selector: 'app-task-timer-list',
  templateUrl: './task-timer-list.component.html',
  styleUrls: ['./task-timer-list.component.scss']
})
export class TaskTimerListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TaskTimerListDataSource;

  displayedColumns = ['time', 'timestamp'];

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.dataSource = new TaskTimerListDataSource(this.paginator, this.sort);
  }

  public getTotalTime() {
    //return this.taskService.getTotalTimeFromTask(this.task.id);
  }
}
