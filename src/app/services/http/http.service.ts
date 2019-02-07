import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
serverUrls = {
  getChatAppChats: '/messengers/{{type}}/sessions',
  getChatAppInfo: '/messengers/{{type}}/about',
  login: '/users/login',
  logout: '/users/logout',
  dashboardTop: '/dashboard/top',
  search: '/search',
  activeMission: '/dashboard/left',
  // Alerts & events
  alerts: '/alerts',
  getEvents: '/dashboard/right',
  deleteEvent: '/events/{{id}}',
  // Targets
  targets: '/targets',
  targetDevices: '/targets/{{id}}/devices',
  // Sources
  exportSource: '/exports/sources/{{id}}'
}
config: any;
token: string;
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
  exportSource(sourceId): Observable<any> {
    return this.http.post(this.getUrlByApiName('exportSource', sourceId), this.setHeaders());
  }
  getTargetDeivces(targetId): Observable<any>{
    return this.http.get(this.getUrlByApiName('targetDevices', targetId), this.setHeaders());
  }
  deleteEvent(eventId): Observable<any>{
    return this.http.delete(this.getUrlByApiName('deleteEvent', eventId), this.setHeaders());
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
    let token =  localStorage.getItem('user');
    token = token.slice(10,token.length-2);
    this.setToken();
    return token;
  }
  setToken(){
    let token = localStorage.getItem('user');
    token = token.slice(10,token.length-2);
    this.token = token;
  }

  createTarget(identifiers: [{type: string, value: any}]) : Observable<any>{
    return this.http.post<any>(this.getUrlByApiName('targets'),identifiers,this.setHeaders())
  
  }
  getEvents(): Observable<any> {
    return this.http.get(this.getUrlByApiName('getEvents'), this.setHeaders());
  }
  getActiveMission(): Observable<any> {
    return this.http.get(this.getUrlByApiName('activeMission'), this.setHeaders());
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
  getDashboard(): Observable<any> {
    return this.http[this.getHttpMethod('get')](this.getUrlByApiName('dashboardTop'), this.setHeaders());
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
