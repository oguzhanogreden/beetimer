import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Subject } from 'rxjs';
import { Alert } from '../alert-drawer/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public alerts = new Subject<Alert>();
  constructor() { }

  public getAlertSubject(): Subject<Alert> {
    return this.alerts;
  }

  public alert(message: string) {
    var alert = new Alert();
    alert.message = message;

    this.alerts.next(alert);
  }
}
