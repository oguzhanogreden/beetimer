import { Component, OnInit } from '@angular/core';
import { CommitmentService } from '../services/commitment.service';

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

  private commitmentService: CommitmentService;
  private timer: TimerService;
  private task: TaskService;

  constructor(timer: TimerService, task: TaskService, commitment: CommitmentService) {
    this.commitmentService = commitment;
    this.timer = timer;
    this.task = task;
  }

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

  public getCommitmentList(): void {
    this.commitmentService.commitments.subscribe(
      (x) => {
        this.commitments.push(x);
        console.log(x);
      }
    )
    console.log(this.commitments.length);
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
