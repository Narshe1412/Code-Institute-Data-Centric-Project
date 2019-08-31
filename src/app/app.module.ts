import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { TaskManagerComponent } from './components/tasks/task-manager/task-manager.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { TimerComponent } from './components/timer/timer.component';
import { TimePipe } from './pipes/time.pipe';
import { ActiveTaskBannerComponent } from './components/active-task-banner/active-task-banner.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SettingsComponent } from './components/settings/settings.component';
import { ReportsComponent } from './components/reports/reports.component';
import { GridComponent } from './components/reports/grid/grid.component';
import { TaskTimerListComponent } from './components/tasks/task-timer-list/task-timer-list.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TaskListComponent,
    TaskComponent,
    TaskManagerComponent,
    TimePipe,
    ActiveTaskBannerComponent,
    NavComponent,
    SettingsComponent,
    ReportsComponent,
    GridComponent,
    TaskTimerListComponent
  ],
  imports: [
    HttpClientModule,
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    DragDropModule,
    FlexLayoutModule,
    LayoutModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    // Angular Material
    MaterialModule
  ],
  exports: [TimePipe, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
