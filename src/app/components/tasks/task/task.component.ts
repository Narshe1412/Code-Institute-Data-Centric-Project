import { TimeRecord } from './../../../model/ITimeRecord';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskStatus } from 'src/app/model/ITaskStatus';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import {
  faLock,
  faHourglassHalf,
  faLockOpen,
  faAngleDoubleUp,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';
import {
  faCheckSquare,
  faSquare,
  faTrashAlt,
  faPlayCircle,
  faClock
} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  // Font awesome imports
  faClock = faClock;
  faLock = faLock;
  faHourglassHalf = faHourglassHalf;
  faLockOpen = faLockOpen;
  faCheckSquare = faCheckSquare;
  faSquare = faSquare;
  faTrashAlt = faTrashAlt;
  faPlayCircle = faPlayCircle;
  faDoubleUp = faAngleDoubleUp;
  faDotsV = faEllipsisV;

  // Paginator for times
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  // Receives task from parent component
  @Input() task;

  // Holds the status of the component
  public statusType: TaskStatus[];
  public expanded = false;

  // Holds the status of the table
  public isAnimated;
  displayedColumns: string[] = ['amount', 'timestamp'];
  dataSource = new MatTableDataSource<TimeRecord[]>();
  constructor(private taskService: TasksService) {}

  ngOnInit() {
    // Initialize table
    this.statusType = Object.values(TaskStatus);
    this.dataSource.paginator = this.paginator;
    this.dataSource = new MatTableDataSource<TimeRecord[]>(
      this.task.timeWorked
    );
  }

  /**
   * Updates task status based on the dropdown value
   */
  public onSelectStatus(event) {
    this.taskService.updateTaskStatus(this.task.id, event.target.value);
  }

  /**
   * Advances the task status to the next logical one automatically
   */
  public advanceStatus() {
    this.taskService.advanceTaskStatus(this.task.id);
  }

  /**
   * Manually modifies the task status
   * @param newStatus
   */
  public setTaskStatusTo(newStatus: string) {
    this.taskService.advanceTaskStatus(this.task.id, undefined, newStatus);
  }

  /**
   * Deletes selected task
   */
  public deleteTask() {
    this.taskService.deleteTask(this.task);
  }

  /**
   * Returns if the current task is the same one that has been selected as active
   */
  public isCurrentActiveTask(): boolean {
    return (
      this.task.id ===
      (this.taskService.activeTask && this.taskService.activeTask.id)
    );
  }

  /**
   * Marks clicked task to Active in the application
   */
  public setAsActiveTask() {
    this.taskService.setActiveTaskById(this.task.id);
  }
}
