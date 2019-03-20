import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-config/app-config.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
serverUrls = {
  // User
  login: '/users/login',
  logout: '/users/logout',

  // Dashboard
  top: '/dashboard/top',
  search: '/search',
  dashboard: '/dashboard/left',

  // Messengers
  getChatAppChats: '/messengers/{{type}}/sessions',
  getChatAppInfo: '/messengers/{{type}}/about',

  // Applog
  getAlerts: '/alerts',
  getEvents: '/dashboard/right',
  dismissEvent: '/events/{{id}}',
  dismissAlert: '/alerts/{{id}}',
  // Targets
  targets: '/targets',
  archiveTarget: '/targets/{{id}}/archive',

  // Sources
  exportSource: '/exports/sources/{{id}}',
  terminateAgent: '/sources/{{id}}/shutdown',
  abortExport: '/exports/{{id}}/abort',
  getSourceTasks: '/sources/{{id}}/intls',
  getSourceDeviceInfo: '/sources/{{id}}/deviceinfo',
  // Pioneer Devices
  findPioneerDevices: '/infections/pioneers/targets/{{id}}',
  queryPioneerDevices: '/infections/pioneers/targets/{{id}}',

  checkDevice: '/devices/{{id}}/check',
  attackDevice: '/devices/{{id}}/attack',
  abortDevice: '/devices/{{id}}/abort',

  // Pioneer Machines
  resetPioneerMachine: '/infections/pioneers/machines/{{id}}/reset',
};

config: any;
env: any;
  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService
    ) { 
      this.env = this.appConfig.getConfig();
  }
  getToken() : any {
    let token = localStorage.getItem('user');
    return token;
  }
  getHttpMethod(original: string) {
    if (environment.envName === 'DEV') {
      return 'get';
    }
    return original;
  }
  getUrlByApiName(apiName: string, id?: string, addiotnal?: string): string {
      let url = this.env.apiUrl + this.serverUrls[apiName].replace('{{id}}', id);
      if (addiotnal) {
        url += addiotnal;
      }
      return url;
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
  archiveTarget(targetId: string): Observable<any>{
    return this.http.post(this.getUrlByApiName('archiveTarget', targetId),'', this.setHeaders());
  }
  getSourcesTasks(sourceId: string): Observable<any>{
    return this.http.get('../../assets/config/tasks.json');
      // return this.http.get(this.getUrlByApiName('getSourceTasks', sourceId), this.setHeaders());
  }
  getSourceDeviceInfo(sourceId: string): Observable<any>{
    return this.http.get(this.getUrlByApiName('getSourceDeviceInfo', sourceId), this.setHeaders());
  }
  queryPioneerDevices(targetId: string): Observable<any>{
    return this.http.post(this.getUrlByApiName('queryPioneerDevices', targetId),'', this.setHeaders());
  }
  checkDevice(deviceId: string): Observable<any>{
    return this.http.post(this.getUrlByApiName('checkDevice', deviceId),'', this.setHeaders());
  }
  attackDevice(deviceId: string): Observable<any>{
    return this.http.post(this.getUrlByApiName('attackDevice', deviceId),'', this.setHeaders());
  }
  abortDevice(deviceId: string): Observable<any>{
    return this.http.post(this.getUrlByApiName('abortDevice', deviceId),'', this.setHeaders());
  }
  resetPioneerMachine(pioneerId: string): Observable<any>{
    return this.http.post(this.getUrlByApiName('resetPioneerMachine', pioneerId),'', this.setHeaders());
  }
  terminateAgent(sourceId: string): Observable<any>{
    return this.http.post(this.getUrlByApiName('terminateAgent',sourceId),null, this.setHeaders())
  }
  findPioneerDevices(targetId: string): Observable<any>{
    return this.http.get(this.getUrlByApiName('findPioneerDevices', targetId), this.setHeaders());
  }
  dismissEvent(eventId: string): Observable<any>{
    return this.http.delete(this.getUrlByApiName('dismissEvent', eventId), this.setHeaders());
  }
  dismissAlert(alertId: string): Observable<any>{
    return this.http.delete(this.getUrlByApiName('dismissAlert', alertId), this.setHeaders());
  }
  abortExport(exportId: string): Observable<any>{
    return this.http.post(this.getUrlByApiName('abortExport', exportId),'', this.setHeaders());
  }
  createTarget(identifiers: [{type: string, value: any}]) : Observable<any>{
    return this.http.post<any>(this.getUrlByApiName('targets'),identifiers,this.setHeaders())
  }
  exportSource(sourceId: string): Observable<any> {
    return this.http.post(this.getUrlByApiName('exportSource', sourceId), null,this.setHeaders());
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
    return this.http.get(this.getUrlByApiName('getAlerts'), this.setHeaders());
  }
  getConfig() : any {
    this.config =  this.http.get('../../../assets/config/config.json');
    return this.config;
  }
  getConfigLocal(): any{
    return this.config;
  }
  getIntel(intelName, sourceId): Observable<any>{
    switch(intelName){
      case 'DEVICE_INFO':
       return this.getSourceDeviceInfo(sourceId);
      default: 
      return this.getSourceDeviceInfo(sourceId);
    }
  }
}
