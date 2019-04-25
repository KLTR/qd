import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '@app/components/menu/menu.service';
import { ConnectionService, WsService } from '@app/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { HttpService } from '../../services/http/http.service';
import { AuthService } from './../../services/auth/auth.service';
import { AlertsModalComponent } from './../system-bar/alerts/alerts-modal/alerts-modal.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() system: any;
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

  constructor(
    private menuService: MenuService,
    private httpService: HttpService,
    private ws: WsService,
    private modalService: NgbModal,
    private connectionService: ConnectionService,
    private authService: AuthService
  ) {
    this.system = [];
    this.ws.messages.subscribe(msg => this.catchWebSocketEvents(msg));
  }

  ngOnInit() {
    this.searchResults = [];
    this.httpService.getTop().subscribe(res => {
      this.system = res;
      console.log(res);
      if (res.product_version) {
        console.log('product_version: ', res.product_version);
      }
    });
  }

  toggleAlerts() {
    this.httpService.getEvents().subscribe(res => {
      const alertsModalRef = this.modalService.open(AlertsModalComponent, {
        windowClass: 'alerts-window',
        backdrop: 'static'
      });
      console.log(res);
      alertsModalRef.componentInstance.alerts = res.events;
    });
  }
  logout() {
    this.authService.logout();
  }

  filterItem(searchValue) {
    const search = {
      scope: '',
      keyword: searchValue
    };
    this.httpService.search(search).subscribe(res => {
      this.searchResults = res;
    });
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }

  catchWebSocketEvents(msg) {
    if (Object.keys(msg)[0] === 'error') {
      return;
    }
    console.log(msg.result);
    switch (Object.keys(msg.result)[0]) {
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
      case 'new_alert':
        const alert = msg.result.new_alert;
        this.system.alert.count++;
        this.system.alert.log = alert;
        // this.system.alert = msg.result.new_alert;
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
    this.system = Object.assign({}, this.system);
  }
  clearSearchResults() {
    this.searchResults = [];
  }
}
