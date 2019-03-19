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
    const mock: Task = {
      id: 0,
      status: null,
      title: 'This is a title',
      reference: '1111',
      description: 'This is a description',
      timeWorked: [
        { amount: 15000, timestamp: Date.now() - 19999990000 },
        { amount: 111000, timestamp: Date.now() - 5000000000 },
        { amount: 900000, timestamp: Date.now() }
      ]
    };
    this.taskService.taskList.push(mock);
  }

  newTask() {
    console.log(this.task);
    this.taskService.addTask(this.task.title, this.task.reference, this.task.description);
  }

  onSubmit() {
    this.submitted = true;
  }
}
