import {Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
// import { WebSocketCommonService } from '@quadream/ui-common';

@Component({
  selector: 'app-alerts-strip',
  templateUrl: './alerts-strip.component.html',
  styleUrls: ['./alerts-strip.component.scss']
})
export class AlertsStripComponent implements OnInit {
  showStrip = false;
  message: string;
  subscription: Subscription;

  constructor(
    // private websocket: WebSocketCommonService
    ) {
  }

  ngOnInit() {
    // this.subscription = this.websocket.getSocketsFor('alert-created').subscribe((action: { type: string, eventdata: any }) => {
    //   if (action.eventdata.severity === 'critical') {
    //     this.showStrip = true;
    //     this.message = action.eventdata.description;
    //     setTimeout(() => { this.showStrip = false; }, 30000);
    //   }
    // });
  }

  hideStrip() {
    this.showStrip = false;
  }

}
