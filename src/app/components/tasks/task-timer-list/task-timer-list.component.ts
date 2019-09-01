import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  TaskTimerListDataSource,
  TaskTimerListItem
} from './task-timer-list-datasource';
import { TimeRecord } from 'src/app/model/ITimeRecord';

@Component({
  selector: 'app-task-timer-list',
  templateUrl: './task-timer-list.component.html',
  styleUrls: ['./task-timer-list.component.scss']
})
export class TaskTimerListComponent implements OnInit {
  @Input() timeWorkedList: TimeRecord[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public dataSource: TaskTimerListDataSource;

  displayedColumns = ['amount', 'timestamp'];

  constructor(private changeDetectorRefs: ChangeDetectorRef) {}

  ngOnInit() {
    this.refresh();
  }

  /**
   * On information updated through angular change detection, force a refresh of the table
   */
  refresh() {
    this.dataSource = new TaskTimerListDataSource(
      this.paginator,
      this.sort,
      this.timeWorkedList as TaskTimerListItem[]
    );
    this.changeDetectorRefs.detectChanges();
  }

  /**
   * Helper function to display total time in the table
   */
  public getTotalTime() {
    return this.timeWorkedList.reduce((acc, item) => acc + item.amount, 0);
  }
}
