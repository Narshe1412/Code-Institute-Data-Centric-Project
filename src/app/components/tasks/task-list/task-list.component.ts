import { TasksService } from './../../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  public taskCollection;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.taskCollection = this.tasksService.taskList$;
  }
}
