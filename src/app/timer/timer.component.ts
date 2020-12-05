import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { CommitmentService } from '../services/commitment.service';
import { ReminderService } from '../services/reminder.service';

import { TaskService } from '../services/task.service';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  public displaySeconds: string;
  public commitments = [];

  private reminderSubscription: Subscription;

  constructor(private timer: TimerService,
              private task: TaskService,
              private reminder: ReminderService,
              private alert: AlertService) { }

  ngOnInit(): void {
    this.timer.epochTimed.subscribe(
      (value) => {
        this.displaySeconds = value.toFormat("h:mm:ss");
      }
    )
  }

  public pauseTimer(): void {
    this.timer.pauseTimer();
  }
  public startTimer(): void {
    this.timer.startTimer();
  }

  public getTaskName(): string {
    return this.task.name;
  }

  public saveDataPoint(): void {
  };

  public setTaskName(name: string): void {
    this.task.setName(name);
  }

  private setReminder(milliseconds: number) {
    this.reminderSubscription = this.reminder.getReminderSubject().subscribe(
      (value) => {
        if (value) {
          this.alert.alert("alaaarm");
        }
      }
    )

    this.reminder.toggleReminder(this.timer.epochTimed, milliseconds);
  }

  private unsetReminder() {
    this.reminderSubscription.unsubscribe();
    this.reminderSubscription = null;

    this.reminder.toggleReminder();
  }

  public toggleReminder(milliseconds: number): void {
    if (this.reminderSubscription) {
      this.unsetReminder();
    } else {
      this.setReminder(milliseconds);
    }
  }

}
