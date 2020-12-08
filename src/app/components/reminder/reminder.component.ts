import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Reminder } from 'src/app/models/reminder.model';
import { AlertService } from 'src/app/services/alert.service';
import { ReminderService } from 'src/app/services/reminder.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  public reminder: Reminder;

  private reminderSubscription: Subscription;

  constructor (private reminderService: ReminderService,
               private alert: AlertService,
               private timer: TimerService){ }

  ngOnInit(): void {
  }

  private setReminder(milliseconds: number) {
    this.reminderSubscription = this.reminderService.getReminderSubject().subscribe(
      (value) => {
        if (value) {
          this.alert.alert("alaaarm");
        }
      }
    )

    this.reminderService.toggleReminder(this.timer.epochTimed, milliseconds);
  }

  private unsetReminder() {
    this.reminderSubscription.unsubscribe();
    this.reminderSubscription = null;

    this.reminderService.toggleReminder();
  }

  public toggleReminder(milliseconds: number): void {
    if (this.reminderSubscription) {
      this.unsetReminder();
    } else {
      this.setReminder(milliseconds);
    }
  }

}
