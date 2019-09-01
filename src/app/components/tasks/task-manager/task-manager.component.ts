import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskStatus } from 'src/app/model/ITaskStatus';
import { Task } from 'src/app/model/ITask';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {
  faPlus = faPlus;
  faMinus = faMinus;
  public taskList: Task[];
  public task;
  public submitted = false;
  public statusType: TaskStatus[];
  public formVisible = false;
  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.task = {};
    this.statusType = Object.values(TaskStatus);
    this.taskList = this.taskService.taskList;
  }

  newTask() {
    this.taskService.addTask(
      this.task.title,
      this.task.reference,
      this.task.description
    );
    this.formVisible = false;
  }

  onSubmit() {
    this.submitted = true;
    this.formVisible = false;
  }
}
