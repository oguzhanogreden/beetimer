import { Injectable } from '@angular/core';
import { Duration } from 'luxon';
import { BehaviorSubject, Subject, Observable, Subscription } from 'rxjs';
import { Reminder } from '../models/reminder.model';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  // this will check the timer, and decide if the user needs to see a notification
  public reminders: Reminder[] = []; 
  public reminder = new BehaviorSubject<Reminder>(null); 

  private timerSubscription: Subscription;

  constructor() { }

  public getReminder(id: string): Reminder {
    return this.reminders.filter((x) => x.id === id)[0];
  };

  public deleteReminder(id: string): void {
    this.reminders = this.reminders.filter((x) => x.id !== id);
  }

  //obsolete
  public toggleReminder(id: string, epochTimed?: BehaviorSubject<Duration>, everyMs?: number, playSound?: boolean) {
    let reminder = this.getReminder(id);
    console.log(reminder);

    if (reminder) {
      this.unsetReminder(id);
    } else {
      this.setReminder(epochTimed, everyMs, playSound, id);
    }
  }

  public setReminder(epochTimed: BehaviorSubject<Duration>, everyMs: number, playSound: boolean, id: string): Reminder {
    var newReminder = new Reminder();

    newReminder.playSoundOnRemind = playSound;
    newReminder.rateMs = everyMs;
    newReminder.id = id;
    newReminder.remindSubject = new Subject<boolean>();

    newReminder.timerSubscription = epochTimed.subscribe(
      (epoch) => {
        if ((epoch.valueOf() !== 0) && ((epoch.valueOf() % everyMs) === 0)) {
          newReminder.remindSubject.next(true);
        } else {
          newReminder.remindSubject.next(null);
        }
      }
    );

    this.reminders.push(newReminder);
    return newReminder;
  }
  
  //obsolete
  public unsetReminder(id: string): void {
    var reminder = this.getReminder(id);

    reminder.timerSubscription.unsubscribe();

    // reset status
    reminder.remindSubject.complete();
    this.deleteReminder(id);
  }
}
