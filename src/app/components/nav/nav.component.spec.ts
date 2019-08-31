import { ReportsComponent } from './../reports/reports.component';
import { ActiveTaskBannerComponent } from './../active-task-banner/active-task-banner.component';
import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NavComponent } from './nav.component';
import { TimerComponent } from '../timer/timer.component';
import { TaskListComponent } from '../tasks/task-list/task-list.component';
import { SettingsComponent } from '../settings/settings.component';
import { TaskManagerComponent } from '../tasks/task-manager/task-manager.component';
import { TaskComponent } from '../tasks/task/task.component';
import { GridComponent } from '../reports/grid/grid.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavComponent,
        ActiveTaskBannerComponent,
        TimerComponent,
        TaskListComponent,
        ReportsComponent,
        SettingsComponent,
        TaskManagerComponent,
        TaskComponent,
        GridComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        LayoutModule,
        MaterialModule,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
