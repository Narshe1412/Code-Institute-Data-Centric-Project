import { TasksService } from 'src/app/services/tasks.service';
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
  private _timerStatus$: BehaviorSubject<TimerStatus>;
  private _currentTime: number;

  // Accessors and mutators
  public get elapsedTime() {
    return Math.abs(this.settings.timerStartAmount - this._currentTime);
  }

  public get timer$() {
    return this._timer$;
  }
  public set timer$(value) {
    this._timer$ = value;
  }

  public get timerStatus(): TimerStatus {
    return this.timerStatus$.getValue();
  }
  public set timerStatus(value: TimerStatus) {
    this.timerStatus$.next(value);
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

  // Getters to parse a specific part of the time (hours, mins, secs) from the current time in milliseconds
  public getSeconds(time = this.currentTime): number {
    if (time < 0) {
      return 0;
    }
    return Math.floor(time / 1000);
  }

  public getMinutes(time = this.currentTime): number {
    return Math.floor(this.getSeconds(time) / 60);
  }

  public getHours(time = this.currentTime): number {
    return Math.floor(this.getMinutes(time) / 60);
  }

  public getDisplaySeconds(time = this.currentTime): string {
    const totalSeconds = this.getSeconds(time) % 60;
    const totalWithLeadingZeroes = ('0' + totalSeconds).slice(-2);
    return totalWithLeadingZeroes;
  }

  public getDisplayMinutes(time = this.currentTime): string {
    const totalMinutes = this.getMinutes(time) % 60;
    const totalWithLeadingZeroes = ('0' + totalMinutes).slice(-2);
    return totalWithLeadingZeroes;
  }

  public getDisplayHours(time = this.currentTime): string {
    return this.getHours(time) < 10
      ? `0${this.getHours(time)}`
      : this.getHours(time).toString();
  }

  constructor(
    private settings: SettingsService,
    private tasksService: TasksService
  ) {
    this.currentTime = 0;
    this.timerStatus$ = new BehaviorSubject<TimerStatus>(TimerStatus.stopped);
  }

  /**
   * Updates the current time by the specified amount
   */
  public changeTimeByAmount(amount = this.settings.countingAmount): number {
    amount *= 1000;
    return (this.currentTime += amount);
  }

  /**
   * Resets the timer
   */
  public resetTimer() {
    this.currentTime = this.settings.timerStartAmount;
  }

  /**
   * Gets the display of the timer in HHMMSS format
   */
  public getDisplayTimeInHHMMSS(time = this.currentTime): string {
    return `${this.getDisplayHours(time)}:${this.getDisplayMinutes(
      time
    )}:${this.getDisplaySeconds(time)}`;
  }

  /**
   * Sends the current elapsed time to the task service to store the timer
   */
  public addTimeToTask() {
    this.timerStatus$.next(TimerStatus.stopped);
    this.tasksService
      .addTimeToTask(this.tasksService.activeTask.id, this.elapsedTime)
      .then(res => this.resetTimer());
  }
}
