import { Injectable } from '@angular/core';
const POMODORO_DEFAULT_START = 25 * 60 * 1000; // 25 min in ms
const STANDARD_DEFAULT_START = 60 * 60 * 1000; // 60 min in ms
/**
 * Service that is used to centralize common settings for different pieces of the application
 *
 * @export SettingService class with multiple accessors to control the app settings
 */
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // Attributes
  private _timerType: 'pomodoro' | 'standard';
  private _timerStartAmount;

  // Setters/getters

  /**
   * Obtains the starting amount for a clock
   * @returns The default value for a pomodoro/standard clock, or if custom value is selected, return that one
   */
  public get timerStartAmount() {
    // Return stored setting if exists
    if (this._timerStartAmount) {
      return this._timerStartAmount;
    }

    // Return default otherwise
    switch (this.timerType) {
      case 'pomodoro':
        return POMODORO_DEFAULT_START;
      case 'standard':
        return STANDARD_DEFAULT_START;
      default:
        return 0;
    }
  }

  /**
   * Sets a default start timer amount
   * @param amountInSeconds The starting amount of the timer, in seconds
   */
  public set timerStartAmount(amountInSeconds) {
    this._timerStartAmount = amountInSeconds * 1000;
  }

  /**
   * Obtains type of timer for the application
   */
  public get timerType(): 'pomodoro' | 'standard' {
    return this._timerType;
  }

  /**
   * Sets the type of timer that would be used if the user does not want to mess with the settings
   */
  public set timerType(value: 'pomodoro' | 'standard') {
    this._timerType = value;
  }
  constructor() {}
}
