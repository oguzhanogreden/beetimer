import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert-drawer',
  templateUrl: './alert-drawer.component.html',
  styleUrls: ['./alert-drawer.component.scss']
})
export class AlertDrawerComponent implements OnInit, OnDestroy {
  public alerts = [];

  private alertSubscription: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getAlertSubject().subscribe(alert => {
      if (!alert.message) {
        this.alerts = [];
      } else {
        this.alerts.push(alert);
        console.log(this.alerts);
      }
    });
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
  }
}
