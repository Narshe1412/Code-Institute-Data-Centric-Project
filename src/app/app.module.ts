import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { TaskManagerComponent } from './components/tasks/task-manager/task-manager.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { TimerComponent } from './components/timer/timer.component';
import { TimePipe } from './pipes/time.pipe';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
// FA Icons
import { faLock, faHourglassHalf, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import {
  faCheckSquare,
  faSquare,
  faTrashAlt,
  faPlayCircle
} from '@fortawesome/free-regular-svg-icons';

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
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    DragDropModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [TimePipe],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(
      faCheckSquare, // Task Done
      faSquare, // Task to do
      faHourglassHalf, // Task in progress
      faLock, // Archived
      faLockOpen, // Archive task
      faTrashAlt, // Delete task
      faPlayCircle // Start task
    );
  }
}
