import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  @Input() id = 'default-reminder';

  public playSound = new FormControl(true);
  public frequencyMinutes  = new FormControl(25);

  private reminderSubscription: Subscription;

  constructor (private reminderService: ReminderService,
               private alert: AlertService,
               private timer: TimerService){ }

  ngOnInit(): void {
  }

  private onRemind(milliseconds: number) {
    this.reminderService.toggleReminder(this.id, this.timer.epochTimed, milliseconds, true);

    var reminder = this.reminderService.getReminder(this.id);
    
    this.reminderSubscription = reminder.remindSubject.subscribe(
      (reminder) => {
        if (reminder) {
          this.alert.alert("alaaarm");
        }
      }
    )

  }

  private unsetReminder() {
    this.reminderSubscription.unsubscribe();
    this.reminderSubscription = null;

    this.reminderService.toggleReminder(this.id);
  }

  public toggleReminder(): void {
    if (this.reminderSubscription) {
      this.unsetReminder();
    } else {
      this.onRemind(this.frequencyMinutes.value); // # * 60 * 1000);
    }
  }

}
