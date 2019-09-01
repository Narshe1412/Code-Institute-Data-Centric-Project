import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { SettingsService, TimerType } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  hasUnitNumber = false;

  constructor(public settings: SettingsService) {}

  ngOnInit() {}

  /**
   * Updates the counting type on the application
   */
  changeCountingType(event: MatRadioChange) {
    this.settings.countingType = event.value;
    if (event.value === 'stopwatch') {
      this.settings.timerType = TimerType.Custom;
    }
  }

  /**
   * Changes the current counting amount
   */
  changeCountingAmount(event: MatRadioChange) {
    this.settings.timerType = event.value as TimerType;
  }

  changeSaveLocation(event: MatRadioChange) {
    // Not yet implemented
  }
}
