import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { Alert } from './alert.model';

@Component({
  selector: 'app-alert-drawer',
  templateUrl: './alert-drawer.component.html',
  styleUrls: ['./alert-drawer.component.scss']
})
export class AlertDrawerComponent implements OnInit, OnDestroy {
  public alerts: Alert[] = [];

  private alertSubscription: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getAlerts().subscribe(alert => {
      if (!alert.message) {
        this.alerts = [];
      } else {
        this.alerts.push(alert);

        if (alert.playSound) {
          this.playNotificationSound();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
  }

  public playNotificationSound(): void {
    var audioObj = new Audio("/assets/sounds/Taptap.wav");

    audioObj.play();
  }

  public removeAlert(alert: Alert) {
    // jasonwatmore does a check here, I don't get his text so I'll skip the check
    // and learn when it fails.

    this.alerts = this.alerts.filter(x => x.id !== alert.id);
  }
}
