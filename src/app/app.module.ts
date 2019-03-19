import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatTableModule, MatPaginatorModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimerComponent } from './components/timer/timer.component';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { TaskManagerComponent } from './components/tasks/task-manager/task-manager.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TaskListComponent,
    TaskComponent,
    TaskManagerComponent,
    TimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    DragDropModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
