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
  @ViewChild('pause') pauseBtn: ElementRef;
  @ViewChild('start') startBtn: ElementRef;
  @ViewChild('resume') resumeBtn: ElementRef;
  @ViewChild('stop') stopBtn: ElementRef;
  @ViewChild('countdown') countdownRd: ElementRef;
  @ViewChild('stopwatch') stopwatchRd: ElementRef;
  private timer$: any;
  private isInterested$: any;
  public timerStatus: TimerStatus;

  constructor(private timerService: TimerService, private settings: SettingsService) {
    this.timerService.timerStatus$.subscribe(status => {
      this.timerStatus = status;
    });
  }

  public get time() {
    console.log(this.timerService.currentTime);
    return `${this.timerService.getDisplayHours()}:${this.timerService.getDisplayMinutes()}:${this.timerService.getDisplaySeconds()}`;
  }

  ngOnInit() {
    this.timer$ = timer(1000, 1000);
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
      tap(() => (this.timerService.timerStatus = TimerStatus.running)),
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

  public changeCountdownType(type: CountingType) {
    this.settings.countingType = type;
    this.timerService.resetTimer();
  }
}
