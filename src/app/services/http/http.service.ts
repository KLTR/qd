import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
token: string;
  constructor(private http: HttpClient) { 
   
  }

  getHttpMethod(original: string) {
    if (environment.envName === 'DEV') {
      return 'get';
    }
    return original;
  }
  getUrlByApiName(apiName: string, id?: string, adittional?: string): string {
      let url = environment.baseUrl + this.serverUrls[apiName].replace('{{id}}', id);
      if (adittional) {
        url += adittional;
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

  login(credentials: { user: string, password: string }): Observable<{ token: string, swagger_ui: string }> {
    return this.http[this.getHttpMethod('post')](this.getUrlByApiName('login'), credentials)
  }
  logout(tokenSub: Observable<any>) : Observable<any> {
    let token: string;
    tokenSub.subscribe(res => token = res)
    console.log(token)
    return this.http[this.getHttpMethod('post')](this.getUrlByApiName('logout'), this.setHeaders(token));
  }
  getDashboard(token): Observable<any> {
    return this.http[this.getHttpMethod('get')](this.getUrlByApiName('dashboardTop'), this.setHeaders(token));
  }
  getToken(): string{
    console.log(this.token)
    return this.token;
  }
}
