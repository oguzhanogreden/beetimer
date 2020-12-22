import { Injectable } from '@angular/core';
import { Duration } from 'luxon';

import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  public epochTimed = new BehaviorSubject<Duration>(Duration.fromMillis(0)); // seconds
  private interval;

  public isRunning = new BehaviorSubject<boolean>(false);

  private tick = 250;

  constructor() { }

  public startTimer() {
    if (this.interval) {
      // pass
    } else {
      this.interval = setInterval(() => {
        this.epochTimed.next(this.epochTimed.getValue().plus(this.tick));
      }, this.tick);

      this.isRunning.next(true);
    }
  }

  public pauseTimer() {
    clearInterval(this.interval)
    this.interval = null;

    this.isRunning.next(false);
  }
}
