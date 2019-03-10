import { TestBed } from '@angular/core/testing';

import { TimerService } from './timer.service';

describe('TimerService', () => {
  let timer;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TimerService] });
    timer = TestBed.get(TimerService);
  });

  it('should be created', () => {
    const service: TimerService = TestBed.get(TimerService);
    expect(service).toBeTruthy();
  });

  describe('getSeconds', () => {
    it('should return 3 if the timer has 3000ms ', () => {
      timer.currentTime = 3000;
      const expected = 3;
      const actual = timer.getSeconds();
      expect(actual).toBe(expected);
    });

    it('should return 0 if the timer has 0ms ', () => {
      timer.currentTime = 0;
      const expected = 0;
      const actual = timer.getSeconds();
      expect(actual).toBe(expected);
    });

    it('should return 60 if the timer has 60000ms ', () => {
      timer.currentTime = 60000;
      const expected = 60;
      const actual = timer.getSeconds();
      expect(actual).toBe(expected);
    });

    it('should return 0 if the timer has a negative number ', () => {
      timer.currentTime = -39;
      const expected = 0;
      const actual = timer.getSeconds();
      expect(actual).toBe(expected);
    });

    it('should return 0 if the timer has less than a second ', () => {
      timer.currentTime = 33;
      const expected = 0;
      const actual = timer.getSeconds();
      expect(actual).toBe(expected);
    });

    it('should return 125 if the timer has 125000ms ', () => {
      timer.currentTime = 125000;
      const expected = 125;
      const actual = timer.getSeconds();
      expect(actual).toBe(expected);
    });
  });
  describe('getMinutes', () => {
    it('should return 1 if the timer has 60000ms ', () => {
      // SUT
      timer.currentTime = 60000;

      // Expected
      const expected = 1;

      // Actual
      const actual = timer.getMinutes();

      // Asertion
      expect(actual).toBe(expected);
    });

    it('should return 0 if the timer has less than 60 secs ', () => {
      timer.currentTime = 11;
      const expected = 0;
      const actual = timer.getMinutes();
      expect(actual).toBe(expected);
    });

    it('should return 2 if the timer has 120000ms ', () => {
      timer.currentTime = 2 * 60 * 1000;
      const expected = 2;
      const actual = timer.getMinutes();
      expect(actual).toBe(expected);
    });

    it('should return 0 if the timer has a negative number ', () => {
      timer.currentTime = -39;
      const expected = 0;
      const actual = timer.getMinutes();
      expect(actual).toBe(expected);
    });

    it('should return 125 if the timer has 125 minutes ', () => {
      timer.currentTime = 125 * 60 * 1000;
      const expected = 125;
      const actual = timer.getMinutes();
      expect(actual).toBe(expected);
    });
  });
  describe('getHours', () => {
    it('should return 3 if the timer has 3 hours ', () => {
      // SUT
      timer.currentTime = 3 * 60 * 60 * 1000;

      // Expected
      const expected = 3;

      // Actual
      const actual = timer.getHours();

      // Asertion
      expect(actual).toBe(expected);
    });

    it('should return 0 if the timer has 0ms ', () => {
      // SUT
      timer.currentTime = 0;
      const expected = 0;
      const actual = timer.getHours();
      expect(actual).toBe(expected);
    });

    it('should return 60 if the timer has 60 hours ', () => {
      timer.currentTime = 60 * 60 * 60 * 1000;
      const expected = 60;
      const actual = timer.getHours();
      expect(actual).toBe(expected);
    });

    it('should return 0 if the timer has a negative number ', () => {
      timer.currentTime = -39;
      const expected = 0;
      const actual = timer.getHours();
      expect(actual).toBe(expected);
    });

    it('should return 0 if the timer has less than an hour ', () => {
      timer.currentTime = 33;
      const expected = 0;
      const actual = timer.getHours();
      expect(actual).toBe(expected);
    });

    it('should return 125 if the timer has 125 hours ', () => {
      timer.currentTime = 125 * 60 * 60 * 1000;
      const expected = 125;
      const actual = timer.getHours();
      expect(actual).toBe(expected);
    });
  });

  describe('getDisplaySeconds', () => {
    it('should return 00 if the timer has 0ms ', () => {
      timer.currentTime = 0;
      const expected = '00';
      const actual = timer.getDisplaySeconds();
      expect(actual).toBe(expected);
    });

    it('should return 01 if the timer has 1000ms ', () => {
      timer.currentTime = 1000;
      const expected = '01';
      const actual = timer.getDisplaySeconds();
      expect(actual).toBe(expected);
    });

    it('should return 09 if the timer has 9000ms ', () => {
      timer.currentTime = 9000;
      const expected = '09';
      const actual = timer.getDisplaySeconds();
      expect(actual).toBe(expected);
    });

    it('should return 35 if the timer has 35000ms ', () => {
      timer.currentTime = 35000;
      const expected = '35';
      const actual = timer.getDisplaySeconds();
      expect(actual).toBe(expected);
    });

    it('should return 00 if the timer has negative value ', () => {
      timer.currentTime = -35;
      const expected = '00';
      const actual = timer.getDisplaySeconds();
      expect(actual).toBe(expected);
    });
    it('should return 00 if the timer has less than a second ', () => {
      timer.currentTime = 76;
      const expected = '00';
      const actual = timer.getDisplaySeconds();
      expect(actual).toBe(expected);
    });
    it('should return 00 if the timer has 60000ms ', () => {
      timer.currentTime = 60000;
      const expected = '00';
      const actual = timer.getDisplaySeconds();
      expect(actual).toBe(expected);
    });
    it('should return 02 if the timer has 62000ms ', () => {
      timer.currentTime = 62000;
      const expected = '02';
      const actual = timer.getDisplaySeconds();
      expect(actual).toBe(expected);
    });
    it('should return 50 if the timer has 2930000ms ', () => {
      timer.currentTime = 2930000;
      const expected = '50';
      const actual = timer.getDisplaySeconds();
      expect(actual).toBe(expected);
    });
  });
  describe('getDisplayMinutes', () => {
    it('should return 00 if the timer has 0ms ', () => {
      timer.currentTime = 0;
      const expected = '00';
      const actual = timer.getDisplayMinutes();
      expect(actual).toBe(expected);
    });

    it('should return 01 if the timer has 1 minute ', () => {
      timer.currentTime = 1 * 60 * 1000;
      const expected = '01';
      const actual = timer.getDisplayMinutes();
      expect(actual).toBe(expected);
    });

    it('should return 08 if the timer has 8 minutes ', () => {
      timer.currentTime = 8 * 60 * 1000;
      const expected = '08';
      const actual = timer.getDisplayMinutes();
      expect(actual).toBe(expected);
    });

    it('should return 45 if the timer has 45 mins ', () => {
      timer.currentTime = 45 * 60 * 1000;
      const expected = '45';
      const actual = timer.getDisplayMinutes();
      expect(actual).toBe(expected);
    });

    it('should return 00 if the timer has negative value ', () => {
      timer.currentTime = -35 * 60 * 1000;
      const expected = '00';
      const actual = timer.getDisplayMinutes();
      expect(actual).toBe(expected);
    });
    it('should return 00 if the timer has less than a minute ', () => {
      timer.currentTime = 76;
      const expected = '00';
      const actual = timer.getDisplayMinutes();
      expect(actual).toBe(expected);
    });

    it('should return 00 if the timer has exactly 1 hour ', () => {
      timer.currentTime = 1 * 60 * 60 * 1000;
      const expected = '00';
      const actual = timer.getDisplayMinutes();
      expect(actual).toBe(expected);
    });
    it('should return 02 if the timer has 62 minutes ', () => {
      timer.currentTime = 62 * 60 * 1000;
      const expected = '02';
      const actual = timer.getDisplayMinutes();
      expect(actual).toBe(expected);
    });
    it('should return 30 if the timer has a multiple of 30 minutes and several hours ', () => {
      timer.currentTime = (3 * 60 * 60 + 30 * 60) * 1000;
      const expected = '30';
      const actual = timer.getDisplayMinutes();
      expect(actual).toBe(expected);
    });
  });
  describe('getDisplayHours', () => {
    it('should return 00 if the timer has 0ms ', () => {
      timer.currentTime = 0;
      const expected = '00';
      const actual = timer.getDisplayHours();
      expect(actual).toBe(expected);
    });

    it('should return 01 if the timer has 1 hour ', () => {
      timer.currentTime = 1 * 60 * 60 * 1000;
      const expected = '01';
      const actual = timer.getDisplayHours();
      expect(actual).toBe(expected);
    });

    it('should return 05 if the timer has 5 hours ', () => {
      timer.currentTime = 5 * 60 * 60 * 1000;
      const expected = '05';
      const actual = timer.getDisplayHours();
      expect(actual).toBe(expected);
    });

    it('should return 55 if the timer has 55 hours ', () => {
      timer.currentTime = 55 * 60 * 60 * 1000;
      const expected = '55';
      const actual = timer.getDisplayHours();
      expect(actual).toBe(expected);
    });

    it('should return 00 if the timer has negative value ', () => {
      timer.currentTime = -3500000;
      const expected = '00';
      const actual = timer.getDisplayHours();
      expect(actual).toBe(expected);
    });
    it('should return 00 if the timer has less than an hour ', () => {
      timer.currentTime = 35 * 60 * 1000;
      const expected = '00';
      const actual = timer.getDisplayHours();
      expect(actual).toBe(expected);
    });

    it('should return 300 if the timer has 2930000ms ', () => {
      timer.currentTime = 300 * 60 * 60 * 1000;
      const expected = '300';
      const actual = timer.getDisplayHours();
      expect(actual).toBe(expected);
    });
  });
});
