import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/model/ITask';

@Component({
  selector: 'app-active-task-banner',
  templateUrl: './active-task-banner.component.html',
  styleUrls: ['./active-task-banner.component.scss']
})
export class ActiveTaskBannerComponent implements OnInit {
  public activeTask: Task;

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.taskService.activeTask$.subscribe(task => (this.activeTask = task));
  }

  public deactivateTask() {
    this.taskService.removeActiveTask();
  }
}
