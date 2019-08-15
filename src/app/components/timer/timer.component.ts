import { TimerService, TimerStatus } from './../../services/timer.service';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, merge, empty, timer, EMPTY, of } from 'rxjs';
import { mapTo, tap, startWith, switchMap } from 'rxjs/operators';
import { SettingsService, CountingType } from 'src/app/services/settings.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, AfterViewInit, OnDestroy {
  // HTML element references
  @ViewChild('pause', { static: true }) pauseBtn: ElementRef;
  @ViewChild('start', { static: true }) startBtn: ElementRef;
  @ViewChild('resume', { static: true }) resumeBtn: ElementRef;
  @ViewChild('stop', { static: true }) stopBtn: ElementRef;
  @ViewChild('countdown', { static: true }) countdownRd: ElementRef;
  @ViewChild('stopwatch', { static: true }) stopwatchRd: ElementRef;

  // Class variables
  // Observables
  private timer$: any;
  private isInterested$: any;
  // Flag variables used from the HTML
  public customtime;
  public timertypeselector;
  public timerStatus: TimerStatus;

  /**
   * This makes the isNaN js function available from the HTML template rendered in angular
   */
  public isNaN = (x: any) => isNaN(x);

  constructor(private timerService: TimerService, private settings: SettingsService) {
    this.timerService.timerStatus$.subscribe(status => {
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
    this.timer$ = timer(1000, 1000);
    this.customtime = '';
  }

  ngOnDestroy() {
    this.timer$.unsubscribe();
    this.timerService.timerStatus$.unsubscribe();
  }

  ngAfterViewInit() {
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

    const resumeBtnClick$ = fromEvent(this.resumeBtn.nativeElement, 'click').pipe(
      tap(_ => (this.timerService.timerStatus = TimerStatus.running)),
      mapTo(true)
    );

    const stopBtnClick$ = fromEvent(this.stopBtn.nativeElement, 'click').pipe(
      tap(_ => {
        this.timerService.timerStatus = TimerStatus.stopped;
      }),
      mapTo(false)
    );

    this.isInterested$ = merge(startBtnClick$, pauseBtnClick$, resumeBtnClick$, stopBtnClick$).pipe(
      startWith(false)
    );

    const myTimer$ = this.isInterested$.pipe(
      switchMap(isInterested => (isInterested ? this.timer$ : EMPTY))
    );

    myTimer$.subscribe(() => {
      this.timerService.currentTime = this.timerService.changeTimeByAmount(-1);
    });
  }

  public changeCountdownType(type) {
    this.settings.countingType = type;
    this.timerService.resetTimer();
  }

  public handleSelectTimerType() {
    this.settings.timerType = this.timertypeselector;
    if (this.timertypeselector === 'custom' && this.customtime) {
      this.settings.timerStartAmount = this.customtime * 60;
    }
    this.timerService.resetTimer();
  }
}
