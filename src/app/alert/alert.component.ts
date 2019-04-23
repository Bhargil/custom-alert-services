import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from '../alert.service';
import 'rxjs/add/observable/timer';
import { Observable } from 'rxjs/Observable';
import { interval } from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  private subscription: Subscription;
  message: any;
  private timer: Observable<any>;

  constructor(private alertService: AlertService) {
    // subscribe to alert messages
    this.subscription = alertService.getMessage().subscribe(message => {
      this.message = message;

    });
  }

  ngOnInit() {    
  }

  ngOnDestroy(): void {
    // unsubscribe on destroy to prevent memory leaks
    this.subscription.unsubscribe();
  }
  closeMessage() {
    this.alertService.clearAlertMessage();    
  }


  public setTimer() {
    this.timer = interval(10000); // 5000 millisecond means 5 seconds
    this.timer.subscribe(() => {
      // set showloader to false to hide loading div from view after 5 seconds
      this.closeMessage();
    });
  }

}
