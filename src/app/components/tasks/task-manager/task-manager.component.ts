import { Component, OnInit } from '@angular/core';
import { TasksService, Task, TaskStatus } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {
  public taskList: Task[];
  public task;
  public submitted = false;
  public statusType: TaskStatus[];
  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.task = {};
    this.statusType = Object.values(TaskStatus);
    this.taskList = this.taskService.taskList;
  }

  newTask() {
    console.log(this.task);
    this.taskService.addTask(this.task.title, this.task.reference, this.task.description);
  }

  onSubmit() {
    this.submitted = true;
  }
}
