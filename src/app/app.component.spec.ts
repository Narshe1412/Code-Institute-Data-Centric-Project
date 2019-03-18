import { FormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TimerComponent } from './components/timer/timer.component';
import { MatToolbarModule } from '@angular/material';
import { TaskManagerComponent } from './components/tasks/task-manager/task-manager.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { TaskComponent } from './components/tasks/task/task.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatToolbarModule, FormsModule],
      declarations: [
        AppComponent,
        TimerComponent,
        TaskManagerComponent,
        TaskListComponent,
        TaskComponent
      ]
      // schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the timer component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-timer')).not.toBe(null);
  }));
});
