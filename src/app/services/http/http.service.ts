import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-config/app-config.service';
import { environment } from './../../../environments/environment.prod';
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
    // Pioneer Devices
    findPioneerDevices: '/pioneers/fixmelater/{{id}}',
    queryPioneerDevices: '/pioneers/targets/fixmelater/{{id}}',
    resetPioneerMachine: '/pioneers/{{id}}/reset',

    checkDevice: '/devices/{{id}}/check',
    attackDevice: '/devices/{{id}}/attack',
    abortDevice: '/devices/{{id}}/abort',

    // Tasks
    // getSourceDeviceInfo: '/sources/{{id}}/deviceinfo',
    // getSourceChat: '/sources/{{id}}/{{chatType}}',
    getTasks: '/sources/{{id}}/tasks',
    getSourceIntel: '/sources/{{id}}/{{intelName}}',
    taskAction: '/sources/{{id}}/cnc/{{taskAction}}'
  };

  config: any;
  env: any;
  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.env = this.appConfig.getConfig();
  }
  getToken(): any {
    const token = localStorage.getItem('user');
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
  getUrlByApiNameWithArgs(apiName: string, ...args) {
    let uri = this.env.apiUrl + this.serverUrls[apiName];
    const argsList = this.serverUrls[apiName].match(/{{(.*?)}}/g);
    for (let i = 0; i < argsList.length; i++) {
      uri = uri.replace(argsList[i], args[i]);
    }
    return uri;
  }
  setHeaders(): { headers: HttpHeaders } {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.getToken()
      })
    };
    return httpOptions;
  }
  archiveTarget(targetId: string): Observable<any> {
    return this.http.post(this.getUrlByApiName('archiveTarget', targetId), '', this.setHeaders());
  }
  getSourcesTasks(sourceId: string): Observable<any> {
    return this.http.get('../../assets/config/tasks.json');
    // return this.http.get(this.getUrlByApiName('getSourceTasks', sourceId), this.setHeaders());
  }
  getTasks(sourceId: string): Observable<any> {
    return this.http.get(this.getUrlByApiName('getTasks', sourceId), this.setHeaders());
  }
  queryPioneerDevices(targetId: string): Observable<any> {
    return this.http.post(this.getUrlByApiName('queryPioneerDevices', targetId), '', this.setHeaders());
  }
  checkDevice(deviceId: string): Observable<any> {
    return this.http.post(this.getUrlByApiName('checkDevice', deviceId), '', this.setHeaders());
  }
  attackDevice(deviceId: string): Observable<any> {
    return this.http.post(this.getUrlByApiName('attackDevice', deviceId), '', this.setHeaders());
  }
  abortDevice(deviceId: string): Observable<any> {
    return this.http.post(this.getUrlByApiName('abortDevice', deviceId), '', this.setHeaders());
  }
  resetPioneerMachine(pioneerName: string): Observable<any> {
    return this.http.post(this.getUrlByApiName('resetPioneerMachine', pioneerName), '', this.setHeaders());
  }
  terminateAgent(sourceId: string): Observable<any> {
    return this.http.post(this.getUrlByApiName('terminateAgent', sourceId), null, this.setHeaders());
  }
  findPioneerDevices(targetId: string): Observable<any> {
    return this.http.get(this.getUrlByApiName('findPioneerDevices', targetId), this.setHeaders());
  }
  dismissEvent(eventId: string): Observable<any> {
    return this.http.delete(this.getUrlByApiName('dismissEvent', eventId), this.setHeaders());
  }
  dismissAlert(alertId: string): Observable<any> {
    return this.http.delete(this.getUrlByApiName('dismissAlert', alertId), this.setHeaders());
  }
  abortExport(exportId: string): Observable<any> {
    return this.http.post(this.getUrlByApiName('abortExport', exportId), '', this.setHeaders());
  }
  createTarget(identifiers: [{ type: string; value: any }]): Observable<any> {
    return this.http.post<any>(this.getUrlByApiName('targets'), identifiers, this.setHeaders());
  }
  exportSource(sourceId: string, exportObj: any): Observable<any> {
    console.log(exportObj);
    return this.http.post<any>(this.getUrlByApiName('exportSource', sourceId), exportObj, this.setHeaders());
  }
  getEvents(): Observable<any> {
    return this.http.get(this.getUrlByApiName('getEvents'), this.setHeaders());
  }
  getDashboard(): Observable<any> {
    return this.http.get(this.getUrlByApiName('dashboard'), this.setHeaders());
  }
  search(search: { scope: string; keyword: string }): Observable<any> {
    return this.http[this.getHttpMethod('post')](this.getUrlByApiName('search'), search, this.setHeaders());
  }
  login(credentials: { user: string; password: string }): Observable<{ token: string; swagger_ui: string }> {
    return this.http[this.getHttpMethod('post')](this.getUrlByApiName('login'), credentials);
  }
  logout(): Observable<any> {
    return this.http[this.getHttpMethod('post')](this.getUrlByApiName('logout'), '');
  }
  getTop(): Observable<any> {
    return this.http[this.getHttpMethod('get')](this.getUrlByApiName('top'), this.setHeaders());
  }
  getAlerts(): Observable<any> {
    return this.http.get(this.getUrlByApiName('getAlerts'), this.setHeaders());
  }
  getConfig(): Observable<any> {
    this.config = this.http.get('../../../assets/config/config.json');
    return this.config;
  }
  getConfigLocal(): any {
    return this.config;
  }
  getIntel(intelName, sourceId): Observable<any> {
    return this.http.get(this.getUrlByApiNameWithArgs('getSourceIntel', sourceId, intelName.toLowerCase()), this.setHeaders());
  }
  // getProfilePic(sourceId): Observable<any>{

  // }
  taskAction(taskAction: string, sourceId: string) {
    taskAction = taskAction.toLowerCase();
    return this.http.get(this.getUrlByApiNameWithArgs('taskAction', sourceId, taskAction), this.setHeaders());
  }
}
