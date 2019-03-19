import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { Task } from 'src/app/services/tasks.service';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [BrowserAnimationsModule, MatTableModule, MatPaginatorModule, FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = mock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
