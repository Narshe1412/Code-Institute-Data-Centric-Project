import { AppModule } from './../../../app.module';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './../task/task.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { Task } from 'src/app/services/tasks.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const mock: Task = {
  id: 0,
  status: null,
  title: 'This is a title',
  reference: '1111',
  description: 'This is a description',
  timeWorked: [
    { amount: 1000, timestamp: Date.now() },
    { amount: 1000, timestamp: Date.now() },
    { amount: 1000, timestamp: Date.now() }
  ]
};

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        // TaskListComponent,
        // TaskComponent,
        // TimePipe
      ],
      imports: [MatTableModule, MatPaginatorModule, FormsModule, AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    component.taskCollection = [mock];
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
