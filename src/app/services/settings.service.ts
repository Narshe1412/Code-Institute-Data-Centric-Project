import { Injectable } from '@angular/core';
const POMODORO_DEFAULT_START = 25 * 60;
const STANDARD_DEFAULT_START = 60 * 60;

export enum CountingType {
  up = 'up',
  stopwatch = 'stopwatch',
  down = 'down',
  countdown = 'countdown'
}

const defaults = {
  countingType: CountingType.countdown,
  startTime: POMODORO_DEFAULT_START
};

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
  private _timerType: 'pomodoro' | 'standard' | 'custom';
  private _countingType: CountingType;
  private _timerStartAmount: number;

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
    return this.getDefaultTimePerType(this.timerType);
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
  public get timerType(): 'pomodoro' | 'standard' | 'custom' {
    return this._timerType;
  }

  /**
   * Sets the type of timer that would be used if the user does not want to mess with the settings
   */
  public set timerType(value: 'pomodoro' | 'standard' | 'custom') {
    this.timerStartAmount = this.getDefaultTimePerType(value);
    this._timerType = value;
  }

  /**
   * Obtains the type of counting for the service (up or down).
   */
  public get countingType(): CountingType {
    return this._countingType;
  }

  /**
   *
   * Sets the type of counting the service will be used by the application
   * Choosing up or stopwatch will start the timer on 0 and count incrementally
   * Choosing down or countdown will start the timer on the specified amount and stop at 0
   * @memberof SettingsService
   */
  public set countingType(value: CountingType) {
    this._countingType = value;
  }

  /**
   * Returns the counting amount depending on the current setting defined in the application
   */
  public get countingAmount(): number {
    switch (this.countingType) {
      case CountingType.up:
      case CountingType.stopwatch:
        return 1;
      case CountingType.down:
      case CountingType.countdown:
        return -1;
      default:
        return 0;
    }
  }

  /**
   * Obtains the default time after a type has been passed to the function
   */
  private getDefaultTimePerType(timerType) {
    // Return default otherwise
    switch (timerType) {
      case 'pomodoro':
        return POMODORO_DEFAULT_START;
      case 'standard':
        return STANDARD_DEFAULT_START;
      default:
        return this.timerStartAmount || 0;
    }
  }

  constructor() {
    this.countingType = defaults.countingType;
    this.timerStartAmount = defaults.startTime;
  }
}
