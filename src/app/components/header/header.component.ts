import { AlertsModalComponent } from './../system-bar/alerts/alerts-modal/alerts-modal.component';
import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { MenuService } from '@app/components/menu/menu.service'
import { HttpService } from '../../services/http/http.service';
import { User, SystemInfo } from '@app/models';
import { Observable, Subscription } from 'rxjs';
import * as $ from 'jquery';
import { WsService } from '@app/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() user: any;
  @Input() system: any;
  @Input() alerts: any;
  title = 'app';
  highestLevel: string;
  activeAlerts = [];
  menuState$: Observable<boolean>;
  subscription: Subscription;
  subs: Subscription;
  searchText = '';
  searchResults: any[];
  isChanged = false;
  moreAlerts = false;
  isAlertsOpen = false;
  recentAlert: any;

  constructor(
              private menuService: MenuService,
              private httpService: HttpService,
              private ws: WsService,
              private modalService: NgbModal,
              ) {
                this.ws.messages.subscribe(msg => {
                  this.catchWebSocketEvents(msg)
                })
  }

  ngOnInit() {
   this.searchResults = [];
   this.system.alerts = [];
   this.httpService.getDashboard().subscribe( res =>  this.recentAlert = res.alert)
  }

  toggleAlerts(){
    this.httpService.getAlerts().subscribe(res => {
      this.system.alerts = res.alerts;
      let alertsModalRef = this.modalService.open(AlertsModalComponent, { windowClass:'alerts-window',backdrop: 'static' });
      alertsModalRef.componentInstance.alerts = this.system.alerts;
    });
  }


filterItem(searchValue) {
  let search = {scope: '', keyword: searchValue}
  this.httpService.search(search).subscribe( res => {
    this.searchResults = res
  });
}

  colorEventCircle() {
    if (this.activeAlerts.length > 0) {
      if (this.activeAlerts.find(event => event.severity === 'critical') !== undefined) {
        this.highestLevel = 'critical';
      } else if (this.activeAlerts.find(event => event.severity === 'major') !== undefined) {
        this.highestLevel = 'major';
      } else if (this.activeAlerts.find(event => event.severity === 'info') !== undefined) {
        this.highestLevel = 'info';
      }
    }
    if (this.activeAlerts.length > 99) {
      this.moreAlerts = true;
    }
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }

  showAlerts() {
    // this.httpService.getAlerts().subscribe(alert => {
    //   const alertsModal = this.modalService.open(AlertsModalComponent, {size: 'lg', centered: true, backdrop: 'static'});
    //   alertsModal.componentInstance.alertsData = this.alerts;
    // });
  }


    catchWebSocketEvents(msg) {
    if(Object.keys(msg)[0] === 'error'){
      return;
    }
      switch(Object.keys(msg.result)[0]) {
        // System 
        case 'alice':
        this.system.alice = msg.result.alice;
        break;
        case 'pioneer':
        this.system.pioneer = msg.result.pioneer;
        break;
        case 'cloudx':
        this.system.cloudx = msg.result.cloudx;
        break;
        case 'storage':
        this.system.storage = msg.result.storage;
        break;
        case 'goat':
        this.system.goat = msg.result.goat;
        break;
        case 'internet':
        this.system.internet = msg.result.internet;
        break;
        case 'alert':
        this.recentAlert = msg.result.alert;
        this.system.alerts.unshift(msg.result.alert.log);
        console.log(this.system);
        break;
        case 'interceptor':
        this.system.interceptor = msg.result.interceptor;
        break;
        // Search
        case 'search_result':
        this.searchResults.unshift(msg.result.search_result);
        this.searchResults = this.searchResults.slice();
        break;
      }
      // this triggers on changes
      this.system = Object.assign({}, this.system);
    }
    clearSearchResults(){
      this.searchResults = [];
    }
}
