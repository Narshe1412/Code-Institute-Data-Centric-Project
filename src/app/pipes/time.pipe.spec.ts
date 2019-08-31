import { TimePipe } from './time.pipe';
import { TimerService } from '../services/timer.service';

class MockTimerService extends TimerService {
  constructor() {
    super(null, null);
  }
  getDisplayTimeInHHMMSS() {
    return 'Mocked';
  }
}

describe('TimePipe', () => {
  it('create an instance', () => {
    const pipe = new TimePipe(new MockTimerService());
    expect(pipe).toBeTruthy();
  });
});
