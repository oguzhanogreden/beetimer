import { Injectable } from '@angular/core';
import { Duration } from 'luxon';

import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  public epochTimed = new BehaviorSubject<Duration>(Duration.fromMillis(0)); // seconds
  private interval;

  constructor() { }

  public startTimer() {
    if (this.interval) {

    } else {
      this.interval = setInterval(() => {
        this.epochTimed.next(this.epochTimed.getValue().plus(1000));
      }, 1000);
    }
  }

  public pauseTimer() {
    clearInterval(this.interval)
    this.interval = null;
  }
}
