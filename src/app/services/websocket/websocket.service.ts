import {environment} from '@env/environment.prod'
import { Inject, Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
// import { SOCKET_URL } from './websocket.module';
import { delay, filter, multicast, retryWhen, tap } from 'rxjs/operators';
import { Subscription,Observable,Subject,BehaviorSubject, ConnectableObservable} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketUrl;
  public socketDashboard$: ConnectableObservable<{ type: string, eventdata: any }>;
  private _socketErr: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private socketErr$: Observable<any> = this._socketErr.asObservable();
  constructor() {
    // header={'Sec-WebSocket-Protocol': token}
    this.socketUrl = environment.websocketUrl;
    this.socketDashboard$ = WebSocketSubject.create({
      url: `${this.socketUrl}/dashboard/ws`,
      openObserver: {
        next: (val: any) => {
          console.log('Websocket connected to:', this.socketUrl);
          this._socketErr.next(null);
        }
      },
      closeObserver: {
        next: (val: any) => {
          if(val.wasClean) {
            this._socketErr.next(null);
          } else {
            this._socketErr.next(val);
          }
        }
      }
    }).pipe(
      retryWhen((e) => e.pipe(delay(5000))),
      tap(socket => console.log(socket)),
      multicast(() => new Subject())
    ) as ConnectableObservable<{ type: string, eventdata: any }>;
  }

  setHeaders(token): {headers: HttpHeaders} {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'authorization': `${token}`
      })
    };
    return httpOptions;
  }

  getSocketsFor(...socketTypes: string[]): Observable<{ type: string, eventdata: any }> {
    return this.socketDashboard$.pipe(filter(socket => socketTypes.includes(socket.type)));
  }

  connectSocket(): Subscription {
    return this.socketDashboard$.connect();
  }

  onConnectionError(): Observable<any> {
    return this.socketErr$;
  }

  getAllSockets(): Observable<any> {
    return this.socketDashboard$;
  }
}
