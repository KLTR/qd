import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WsService } from '../websocket/ws.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
serverUrls = {
  getChatAppChats: '/messengers/{{type}}/sessions',
  getChatAppInfo: '/messengers/{{type}}/about',
  login: '/users/login',
  logout: '/users/logout',
  top: '/dashboard/top',
  search: '/search',
  dashboard: '/dashboard/left',
  resetPioneer: '/infection/pioneers/{{id}}/reset',
  // Alerts & events
  alerts: '/alerts',
  getEvents: '/dashboard/right',
  deleteEvent: '/events/{{id}}',
  deleteAlert: '/alerts/{{id}}',
  // Targets
  targets: '/targets',
  targetDevices: '/targets/{{id}}/devices',
  // Sources
  exportSource: '/exports/sources/{{id}}',
  terminateAgent: '/sources/{{id}}/shutdown'
}
config: any;
  constructor(
    private http: HttpClient,
    ) { 
   
  }

  getHttpMethod(original: string) {
    if (environment.envName === 'DEV') {
      return 'get';
    }
    return original;
  }
  getUrlByApiName(apiName: string, id?: string, addiotnal?: string): string {
      let url = environment.baseUrl + this.serverUrls[apiName].replace('{{id}}', id);
      if (addiotnal) {
        url += addiotnal;
      }
      return url;
  }
  resetPioneer(pioneerId: string): Observable<any>{
    return this.http.post(this.getUrlByApiName('resetPioneer', pioneerId), this.setHeaders());
  }
  exportSource(sourceId: string): Observable<any> {
    return this.http.post(this.getUrlByApiName('exportSource', sourceId), this.setHeaders());
  }
  terminateAgent(sourceId: string): Observable<any>{
    return this.http.post(this.getUrlByApiName('terminateAgent',sourceId), this.setHeaders())
  }
  getTargetDeivces(targetId: string): Observable<any>{
    return this.http.get(this.getUrlByApiName('targetDevices', targetId), this.setHeaders());
  }
  deleteEvent(eventId: string): Observable<any>{
    return this.http.delete(this.getUrlByApiName('deleteEvent', eventId), this.setHeaders());
  }
  deleteAlert(alertId: string): Observable<any>{
    return this.http.put(this.getUrlByApiName('deleteAlert', alertId), this.setHeaders());
  }
  setHeaders(): {headers: HttpHeaders} {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'authorization': this.getToken()
      })
    };
    return httpOptions;
  }
  getToken() : any {
    let token = localStorage.getItem('user');
    return token;
  }

  createTarget(identifiers: [{type: string, value: any}]) : Observable<any>{
    return this.http.post<any>(this.getUrlByApiName('targets'),identifiers,this.setHeaders())
  
  }
  getEvents(): Observable<any> {
    return this.http.get(this.getUrlByApiName('getEvents'), this.setHeaders());
  }
  getDashboard(): Observable<any> {
    return this.http.get(this.getUrlByApiName('dashboard'), this.setHeaders());
  }
  search( search: {scope: string, keyword: string}): Observable<any> {
    return this.http[this.getHttpMethod('post')](this.getUrlByApiName('search'), search, this.setHeaders());
  }

  login(credentials: { user: string, password: string }): Observable<{ token: string, swagger_ui: string }> {
   return this.http[this.getHttpMethod('post')](this.getUrlByApiName('login'), credentials);
  }
  logout() : Observable<any> {
    return this.http[this.getHttpMethod('post')](this.getUrlByApiName('logout'),'',this.setHeaders());
    
  }
  getTop(): Observable<any> {
    return this.http[this.getHttpMethod('get')](this.getUrlByApiName('top'), this.setHeaders());
  }

  getAlerts() :Observable<any> {
    return this.http.get(this.getUrlByApiName('alerts'), this.setHeaders());
  }

  getConfig() : any {
    this.config =  this.http.get('../../../assets/config/config.json');
    return this.config;
  }

  getConfigLocal(): any{
    return this.config;
  }
}
