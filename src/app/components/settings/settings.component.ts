import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { SettingsService, TimerType } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [
      null,
      Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder, public settings: SettingsService) {}

  ngOnInit() {}

  changeCountingType(event: MatRadioChange) {
    this.settings.countingType = event.value;
    if (event.value === 'stopwatch') {
      this.settings.timerType = TimerType.Custom;
    }
  }

  changeCountingAmount(event: MatRadioChange) {
    this.settings.timerType = event.value as TimerType;
  }

  changeSaveLocation(event: MatRadioChange) {
    console.log('TCL: SettingsComponent -> changeCountingType -> event', event.value);
    // this.settings.countingType = event.value;
  }

  onSubmit() {
    alert('Thanks!');
  }
}
