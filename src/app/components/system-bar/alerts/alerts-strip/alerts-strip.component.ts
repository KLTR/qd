import {Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { WsService } from '@app/services';
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
    // private ws: WsService
    ) {

      // this.ws.socketEvent.subscribe(msg => {
      //   this.catchWebSocketEvents(msg)
      //   console.log("Dashboard socket : ", msg);
      // })
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


  // catchWebSocketEvents(msg){
  //   console.log(msg);
  //   if(Object.keys(msg)[0] === 'error'){
  //     return;
  //   }
  //   switch(Object.keys(msg.result)[0]) {
  //     case 'alert':
  //     console.log(msg.result.alert.log);
  //     let alert = msg.result.alert.log;
  //     if(alert.severity === 'CRITICAL'){
  //       this.showStrip = true;
  //       this.message = alert.msg;
  //       // setTimeout(() => {this.showStrip = false;}, 30000);
  //     }
  //     break;
  //   }
  // }

}
