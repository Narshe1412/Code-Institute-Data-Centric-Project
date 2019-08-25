import { Component, OnInit } from '@angular/core';
import { TasksService, Task, TaskStatus } from 'src/app/services/tasks.service';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { DataLayerService } from 'src/app/services/data-layer.service';

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
  constructor(private taskService: TasksService, private dal: DataLayerService) {}

  ngOnInit() {
    this.task = {};
    this.statusType = Object.values(TaskStatus);
    this.taskList = this.taskService.taskList;

    this.dal.getAllTasks().subscribe(tasks => {
      this.taskService.taskList$.next(tasks);
    });
    // const mock: Task = {
    //   id: 0,
    //   status: null,
    //   title: 'This is a title',
    //   reference: '1111',
    //   description:
    //     'This is a very long description so we dont have to display the whole thing and we can just ... at the end',
    //   timeWorked: [
    //     { amount: 15000, timestamp: Date.now() - 19999990000 },
    //     { amount: 111000, timestamp: Date.now() - 5000000000 },
    //     { amount: 900000, timestamp: Date.now() }
    //   ]
    // };
    // this.taskService.taskList.push(mock);
    // this.taskService.taskList.push({ ...mock, id: 1 });
    // this.taskService.taskList.push({ ...mock, id: 2 });
  }

  newTask() {
    this.taskService.addTask(this.task.title, this.task.reference, this.task.description);
  }

  onSubmit() {
    this.submitted = true;
  }
}
