
import {
  Injectable
} from '@angular/core';
import * as Rx from 'rxjs';
import {
  map,
  share,
  retry,
} from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { AppConfigService } from '../app-config/app-config.service';
@Injectable()
export class WsService {
  public messages: Rx.Subject < string > ;
  public ws: any;
  public isConnected = false;
  private subject: Rx.Subject < MessageEvent > ;
  private token: string;
  private env: any;

  constructor(private appConfig: AppConfigService) {
    this.env = this.appConfig.getConfig();
  }

  public open(){
    this.token = localStorage.getItem('token');
    if(this.token){
      this.messages = < Rx.Subject < any >>
      this.connect(this.env.webSocketUrl)
      .pipe(
        map((response: MessageEvent): any => {
          let data = JSON.parse(response.data);
          return data;
        })
      )
      console.log("Websocket successfully connected to : ", this.env.webSocketUrl);
    }
  }


  public connect(url): Rx.Subject < MessageEvent > {
    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }
  private create(url): Rx.Subject < MessageEvent > {

    this.ws = new WebSocket(
      url,
      [this.env.wsProtocol, this.token]
    );
    const observable = Rx.Observable.create(
      (obs: Rx.Observer < MessageEvent > ) => {
        this.ws.onmessage = obs.next.bind(obs);
        this.ws.onerror = obs.error.bind(obs);
        this.ws.onclose = obs.complete.bind(obs);
        return this.ws.close.bind(this.ws);
      }
    ).pipe(
      share(),
      retry()
    )
    const observer = {
      next: (data: Object) => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      }
    }
    return Rx.Subject.create(observer, observable);
  }


  // private create(url): Rx.Subject < MessageEvent > {

  //   this.ws = new WebSocket(
  //     url,
  //     [this.env.wsProtocol, this.token]
  //   );
  //   const observable = Rx.Observable.create(
  //     (obs: Rx.Observer < MessageEvent > ) => {
  //       this.ws.onmessage = obs.next.bind(obs);
  //       this.ws.onerror = obs.error.bind(obs);
  //       this.ws.onclose = obs.complete.bind(obs);
  //       return this.ws.close.bind(this.ws);
  //     }
  //   ).pipe(
  //     share()
  //   )
  //   const observer = {
  //     next: (data: Object) => {
  //       if (this.ws.readyState === WebSocket.OPEN) {
  //         this.ws.send(JSON.stringify(data));
  //       }
  //     }
  //   }
  //   return Rx.Subject.create(observer, observable);
  // }
  public close() {
    if (this.ws) {
      this.ws.close();
      console.log('websocket connection closed');
      this.subject = null;
    }
  }
}
