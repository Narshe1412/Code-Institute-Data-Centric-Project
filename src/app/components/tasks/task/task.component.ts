import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TaskStatus, TasksService, Task, TaskTime } from 'src/app/services/tasks.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { faLock, faHourglassHalf, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare, faSquare, faTrashAlt, faPlayCircle, faClock } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  faClock = faClock;
  faLock = faLock;
  faHourglassHalf = faHourglassHalf;
  faLockOpen = faLockOpen;
  faCheckSquare = faCheckSquare;
  faSquare = faSquare;
  faTrashAlt = faTrashAlt;
  faPlayCircle = faPlayCircle;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
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

  public isCurrentActiveTask(): boolean {
    return this.task.id === (this.taskService.activeTask && this.taskService.activeTask.id);
  }

  public setAsActiveTask() {
    this.taskService.setActiveTaskById(this.task.id);
  }
}

/*
  constructor(private fb: FormBuilder) {}

addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [
      null,
      Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;

  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' },
    { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Guam', abbreviation: 'GU' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Marshall Islands', abbreviation: 'MH' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Northern Mariana Islands', abbreviation: 'MP' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Palau', abbreviation: 'PW' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Puerto Rico', abbreviation: 'PR' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virgin Islands', abbreviation: 'VI' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
  ];
*/
