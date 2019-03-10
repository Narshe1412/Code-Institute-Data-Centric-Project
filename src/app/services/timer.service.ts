import { SettingsService } from './settings.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private _currentTime: number;
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

  constructor(private settings: SettingsService) {}

  public changeTimeByAmount(amount = -1): number {
    return this.currentTime + amount;
  }
}
