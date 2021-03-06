import { TimerService, TimerStatus } from './../../services/timer.service';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { fromEvent, merge, empty, timer, EMPTY, of, Subject } from 'rxjs';
import { mapTo, tap, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { SettingsService } from 'src/app/services/settings.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, AfterViewInit, OnDestroy {
  // HTML element references
  @ViewChild('pause', { read: ElementRef, static: false }) pauseBtn: ElementRef;
  // read: ElementRef makes sure we can read the element reference after applying the mat-icon directive
  @ViewChild('start', { read: ElementRef, static: false }) startBtn: ElementRef;
  @ViewChild('resume', { read: ElementRef, static: false })
  resumeBtn: ElementRef;
  @ViewChild('stop', { read: ElementRef, static: false }) stopBtn: ElementRef;
  @ViewChild('countdown', { static: false }) countdownRd: ElementRef;
  @ViewChild('stopwatch', { static: false }) stopwatchRd: ElementRef;

  // Class variables
  // Observables
  private timer$: any;
  private isInterested$: any;
  private onDestroy$: Subject<any> = new Subject();
  // Flag variables used from the HTML
  public customtime;
  public timertypeselector;
  public timerStatus: TimerStatus;

  /**
   * This makes the isNaN js function available from the HTML template rendered in angular
   */
  public isNaN = (x: any) => isNaN(x);

  public get isAddTimeButtonAvailable() {
    return (
      this.timerService.elapsedTime > 0 &&
      this.timerStatus !== TimerStatus.running &&
      this.tasksService.activeTask
    );
  }

  constructor(
    private timerService: TimerService,
    private settings: SettingsService,
    private tasksService: TasksService
  ) {
    this.timerService.timerStatus$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(status => {
        this.timerStatus = status;
      });
  }

  /**
   * Returns the text representation of the time in the HH:MM:SS format
   */
  public get time() {
    return this.timerService.getDisplayTimeInHHMMSS();
  }

  ngOnInit() {
    // Starts the timer observable
    this.timer$ = timer(1000, 1000);
    this.customtime = '';
  }

  ngOnDestroy() {
    // Destroys all observables when component closes down
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngAfterViewInit() {
    // Initiates button listeners
    const startBtnClick$ = fromEvent(this.startBtn.nativeElement, 'click').pipe(
      tap(_ => {
        this.timerService.resetTimer();
        this.timerService.timerStatus = TimerStatus.running;
      }),
      mapTo(true)
    );

    const pauseBtnClick$ = fromEvent(this.pauseBtn.nativeElement, 'click').pipe(
      tap(_ => (this.timerService.timerStatus = TimerStatus.paused)),
      mapTo(false)
    );

    const resumeBtnClick$ = fromEvent(
      this.resumeBtn.nativeElement,
      'click'
    ).pipe(
      tap(_ => (this.timerService.timerStatus = TimerStatus.running)),
      mapTo(true)
    );

    const stopBtnClick$ = fromEvent(this.stopBtn.nativeElement, 'click').pipe(
      tap(_ => {
        this.timerService.timerStatus = TimerStatus.stopped;
      }),
      mapTo(false)
    );

    // Creates source observable that indicates if we should listen for the timer or not
    this.isInterested$ = merge(
      startBtnClick$,
      pauseBtnClick$,
      resumeBtnClick$,
      stopBtnClick$
    ).pipe(startWith(false));

    // Merges isInterested$ observable to the timer observable to obtain values when we're interested in obtaining them
    const myTimer$ = this.isInterested$.pipe(
      takeUntil(this.onDestroy$),
      switchMap(isInterested => (isInterested ? this.timer$ : EMPTY))
    );

    myTimer$.subscribe(() => {
      this.timerService.currentTime = this.timerService.changeTimeByAmount();
    });
  }

  /**
   * Add the current timer on the clock to the current active task
   */
  public addTimeToTask() {
    this.timerService.addTimeToTask();
  }
}
