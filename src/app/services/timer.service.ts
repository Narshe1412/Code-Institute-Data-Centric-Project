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

  constructor(private settings: SettingsService) {}

  public changeTimeByAmount(amount = -1) {
    return this.currentTime + amount;
  }
}
