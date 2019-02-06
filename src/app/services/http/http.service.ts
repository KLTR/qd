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
  getEvents: '/dashboard/right',
  targets: '/targets',
  alerts: '/alerts'
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
  setHeaders(token): {headers: HttpHeaders} {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'authorization': `${token}`
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
    return this.http.post<any>(this.getUrlByApiName('targets'),identifiers,this.setHeaders(this.getToken()))
  
  }
  getEvents(): Observable<any> {
    return this.http.get(this.getUrlByApiName('getEvents'), this.setHeaders(this.getToken()));
  }
  getActiveMission(): Observable<any> {
    return this.http.get(this.getUrlByApiName('activeMission'), this.setHeaders(this.getToken()));
  }
  search( search: {scope: string, keyword: string}): Observable<any> {
    return this.http[this.getHttpMethod('post')](this.getUrlByApiName('search'), search, this.setHeaders(this.getToken()));
  }

  login(credentials: { user: string, password: string }): Observable<{ token: string, swagger_ui: string }> {
   return this.http[this.getHttpMethod('post')](this.getUrlByApiName('login'), credentials);
  }
  logout() : Observable<any> {
    return this.http[this.getHttpMethod('post')](this.getUrlByApiName('logout'),'',this.setHeaders(this.token));
    
  }
  getDashboard(): Observable<any> {
    return this.http[this.getHttpMethod('get')](this.getUrlByApiName('dashboardTop'), this.setHeaders(this.getToken()));
  }

  getAlerts() :Observable<any> {
    return this.http.get(this.getUrlByApiName('alerts'), this.setHeaders(this.getToken()));
  }

  getConfig() : any {
    this.config =  this.http.get('../../../assets/config/config.json');
    return this.config;
  }

  getConfigLocal(): any{
    return this.config;
  }
}
