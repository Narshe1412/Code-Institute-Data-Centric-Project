import { Pipe, PipeTransform } from '@angular/core';
import { TimerService } from '../services/timer.service';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  constructor(private timer: TimerService) {}

  transform(value: any, args?: any): any {
    return this.timer.getDisplayTimeInHHMMSS(value);
  }
}
