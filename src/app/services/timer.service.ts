import { SettingsService } from './settings.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
export enum TimerStatus {
  running = 'running',
  stopped = 'stopped',
  paused = 'paused'
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private _timer$;
  private _timerStatus: TimerStatus;
  private _timerStatus$: BehaviorSubject<TimerStatus>;
  private _currentTime: number;

  public get timer$() {
    return this._timer$;
  }
  public set timer$(value) {
    this._timer$ = value;
  }

  public get timerStatus(): TimerStatus {
    return this._timerStatus;
  }
  public set timerStatus(value: TimerStatus) {
    this._timerStatus = value;
    this.timerStatus$.next(this.timerStatus);
  }

  public get timerStatus$(): BehaviorSubject<TimerStatus> {
    return this._timerStatus$;
  }
  public set timerStatus$(value: BehaviorSubject<TimerStatus>) {
    this._timerStatus$ = value;
  }

  public get currentTime(): number {
    return this._currentTime;
  }
  public set currentTime(value: number) {
    this._currentTime = value;
  }

  public getSeconds(): number {
    if (this.currentTime < 0) {
      return 0;
    }
    return Math.floor(this.currentTime / 1000);
  }

  public getMinutes(): number {
    return Math.floor(this.getSeconds() / 60);
  }

  public getHours(): number {
    return Math.floor(this.getMinutes() / 60);
  }

  public getDisplaySeconds(): string {
    const totalSeconds = this.getSeconds() % 60;
    const totalWithLeadingZeroes = ('0' + totalSeconds).slice(-2);
    return totalWithLeadingZeroes;
  }

  public getDisplayMinutes(): string {
    const totalMinutes = this.getMinutes() % 60;
    const totalWithLeadingZeroes = ('0' + totalMinutes).slice(-2);
    return totalWithLeadingZeroes;
  }

  public getDisplayHours(): string {
    return this.getHours() < 10 ? '0' + this.getHours() : this.getHours().toString();
  }

  constructor(private settings: SettingsService) {
    this.currentTime = 0;
    this.timerStatus$ = new BehaviorSubject<TimerStatus>(TimerStatus.stopped);
  }

  public changeTimeByAmount(amount = -1): number {
    amount = this.settings.countingAmount * 1000;
    return this.currentTime + amount;
  }

  public resetTimer() {
    this.currentTime = this.settings.timerStartAmount;
  }

  public getDisplayTimeInHHMMSS(): string {
    return `${this.getDisplayHours()}:${this.getDisplayMinutes()}:${this.getDisplaySeconds()}`;
  }
}
