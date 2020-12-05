import { Injectable } from '@angular/core';
import { Duration } from 'luxon';

import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  public epochTimed = new BehaviorSubject<Duration>(Duration.fromMillis(0)); // seconds
  private interval;

  private tick = 250;

  constructor() { }

  public startTimer() {
    if (this.interval) {

    } else {
      this.interval = setInterval(() => {
        this.epochTimed.next(this.epochTimed.getValue().plus(this.tick));
      }, this.tick);
    }
  }

  public pauseTimer() {
    clearInterval(this.interval)
    this.interval = null;
  }
}
