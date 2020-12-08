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


  constructor(private timer: TimerService,
              private task: TaskService) { }

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


}
