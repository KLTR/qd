import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './../http/http.service';
import { WsService } from './../websocket/ws.service';

@Injectable()
export class ConnectionService {
  public isInternet: BehaviorSubject<boolean>;
  public isPioneer: BehaviorSubject<boolean>;

  constructor(private ws: WsService, private http: HttpService) {
    this.isInternet = new BehaviorSubject(false);
    this.isPioneer = new BehaviorSubject(false);
    this.http.getTop().subscribe(res => {
      console.log(res);
      if (res.internet) {
        if (res.internet.indicator.state === 'GREEN') {
          this.isInternet.next(true);
        } else {
          this.isInternet.next(false);
        }
      }
      if (res.pioneer) {
        if (res.pioneer.indicator.state === 'GREEN') {
          this.isPioneer.next(true);
        } else {
          this.isPioneer.next(false);
        }
      }
    });
    this.ws.messages.subscribe(msg => this.catchWebSocketEvents(msg));
  }
  setPioneerValue(state: string) {
    if (state === 'GREEN') {
      this.isPioneer.next(true);
    } else {
      this.isPioneer.next(false);
    }
  }
  setInternetValue(state: string) {
    if (state === 'GREEN') {
      this.isInternet.next(true);
    } else {
      this.isInternet.next(false);
    }
  }

  catchWebSocketEvents(msg) {
    if (Object.keys(msg)[0] === 'error') {
      return;
    }
    switch (Object.keys(msg.result)[0]) {
      // System
      case 'pioneer':
        this.setPioneerValue(msg.result.pioneer.indicator.state);
        break;
      case 'internet':
        this.setInternetValue(msg.result.internet.indicator.state);
        break;
    }
  }
}
