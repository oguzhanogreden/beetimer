import { Injectable } from '@angular/core';
import { Duration } from 'luxon';
import { BehaviorSubject, Subject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  // this will check the timer, and decide if the user needs to see a notification
  public reminder = new BehaviorSubject<boolean>(false); 

  private timerSubscription: Subscription;

  constructor() { }

  public getReminderSubject(): Subject<boolean> {
    return this.reminder;
  };

  public toggleReminder(epochTimed?: BehaviorSubject<Duration>, everyMs?: number) {
    if (this.timerSubscription) {
      this.unsetReminder();
    } else {
      this.setReminder(epochTimed, everyMs);
    }
  }

  public setReminder(epochTimed: BehaviorSubject<Duration>, everyMs: number) {
    this.timerSubscription = epochTimed.subscribe(
      (epoch) => {
        if ((epoch.valueOf() !== 0) && ((epoch.valueOf() % everyMs) === 0)) {
          this.reminder.next(true);
        } 
      }
    );
  }
  
  public unsetReminder() {
    this.timerSubscription.unsubscribe();
    this.timerSubscription = null;

    // reset status
    this.reminder.next(false);
  }
}
