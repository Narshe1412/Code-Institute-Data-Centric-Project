import { MaterialModule } from './../../../material.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { Task } from 'src/app/model/ITask';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AppModule } from 'src/app/app.module';
import { TaskManagerComponent } from '../task-manager/task-manager.component';
import { TaskComponent } from '../task/task.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskTimerListComponent } from '../task-timer-list/task-timer-list.component';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TaskListComponent,
        TaskManagerComponent,
        TaskComponent,
        TaskTimerListComponent,
        TimePipe
      ],
      imports: [
        MaterialModule,
        FormsModule,
        FontAwesomeModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
