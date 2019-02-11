import {
  environment
} from '@env/environment.prod';
import {
  Injectable
} from '@angular/core';
import * as Rx from 'rxjs';
import {
  map,
  share,
  catchError
} from 'rxjs/operators';
@Injectable()
export class WsService {
  public messages: Rx.Subject < any > ;
  public ws: any;
  private subject: Rx.Subject < MessageEvent > ;
  private token: string;

  constructor() {
    let userToken = localStorage.getItem('user');
    if (userToken) {
      this.token = userToken;
    }
      this.messages = < Rx.Subject < any >>
      this.connect(environment.websocketUrl)
      .pipe(
        map((response: MessageEvent): any => {
          // console.log(response.data);
          let data = JSON.parse(response.data);
          return data;
        })
      )
  }

  public connect(url): Rx.Subject < MessageEvent > {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Websocket successfully connected to : ", url);
    }
    return this.subject;
  }



  private create(url): Rx.Subject < MessageEvent > {
    let token;
    if(this.token){
       token = this.token.replace('Bearer ', '')
    } else{
       token = this.token;
    }
    this.ws = new WebSocket(
      url,
      [environment.wsProtocol, token]
    );
    const observable = Rx.Observable.create(
      (obs: Rx.Observer < MessageEvent > ) => {
        this.ws.onmessage = obs.next.bind(obs);
        this.ws.onerror = obs.error.bind(obs);
        this.ws.onclose = obs.complete.bind(obs);
        return this.ws.close.bind(this.ws);
      }
    ).pipe(
      share()
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
  public close() {
    if (this.ws) {
      this.ws.close();
      this.subject = null;
    }
  }
}
