import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { fromEvent, merge, empty, timer } from 'rxjs';
import { mapTo, tap, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, AfterViewInit {
  @ViewChild('pause') pauseBtn: ElementRef;
  @ViewChild('start') startBtn: ElementRef;
  @ViewChild('resume') resumeBtn: ElementRef;

  public currentTime: number;

  constructor() {}

  ngOnInit() {
    // const notifyBtn = document.getElementById('notify');
    // const pauseBtn = document.getElementById('pause');
    // const resumeBtn = document.getElementById('resume');
    console.log('oninit', this.pauseBtn, this.startBtn, this.resumeBtn);
  }

  ngAfterViewInit() {
    console.log('afterview', this.pauseBtn, this.startBtn, this.resumeBtn);
    const startBtnClick$ = fromEvent(this.startBtn.nativeElement, 'click').pipe(
      tap(() => this.currentTime = 0),
      mapTo(true)
    );

    const timer$ = timer(1000, 1000);

    const pauseBtnClick$ = fromEvent(this.pauseBtn.nativeElement, 'click').pipe(
      tap(() => console.log('not distrubing mode')),
      mapTo(false)
    );

    const resumeBtnClick$ = fromEvent(this.resumeBtn.nativeElement, 'click').pipe(
      tap(() => console.log('notifications resumed')),
      mapTo(true)
    );

    const isInterested$ = merge(startBtnClick$, pauseBtnClick$, resumeBtnClick$).pipe(startWith(false));

    const myNotifications$ = isInterested$.pipe(
      switchMap(isInterested => (isInterested ? timer$ : empty()))
    );

    myNotifications$.subscribe(val => {
      console.log(val);
      this.currentTime ++;
    });
  }
}
