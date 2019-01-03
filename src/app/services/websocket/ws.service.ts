// import { AuthService } from '@app/services';
import { environment } from './../../../environments/environment.prod';
// import { environment } from '@env/environment.prod';
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable()
export class WsService{
public messages: Rx.Subject<any>;
private token: string;
    constructor(/*auth: AuthService*/){
        //  auth.token$.subscribe(res => this.token = res);
        let tokenz =  localStorage.getItem('user');
     this.token = tokenz.slice(10,tokenz.length-2);
        this.messages = <Rx.Subject<any>>
        this.connect(`${environment.websocketUrl}/dashboard/ws`)
        .pipe(
            map((response: MessageEvent): any =>{
                let data = JSON.parse(response.data);
                return data;
            })
        )
    }
    private subject: Rx.Subject<MessageEvent>;

    public connect(url): Rx.Subject<MessageEvent> {
        if(!this.subject){
            this.subject = this.create(url);
            console.log("Websocket (Dashboard) successfully connected to : ", url);
        } 
        return this.subject;
    }

    private create(url): Rx.Subject<MessageEvent> {
        let ws = new WebSocket(
            url,
            [`Bearer`, `${this.token.substring(7)}`] 
            );
        let observable = Rx.Observable.create(
            (obs: Rx.Observer<MessageEvent>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);
                return ws.close.bind(ws);
            }
        )

        let observer = {
            next: (data: Object) => {
                if(ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        }

        return Rx.Subject.create(observer, observable);
    }
}