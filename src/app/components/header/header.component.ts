import { WebsocketService } from './../../services/websocket/websocket.service';
import {Component, Input, OnInit} from '@angular/core';
import { MenuService } from '@app/components/menu/menu.service'
import { AlertsModalComponent } from './alerts-modal/alerts-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../services/http/http.service';
import { User, SystemInfo } from '@app/models';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { fromSystem, systemActions } from '@app/state';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { WsService } from '@app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() user: User;
  @Input() system: SystemInfo;
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


  constructor(
              private menuService: MenuService,
              private httpService: HttpService,
              private ws: WsService,
         
              ) {
               this.ws.messages.subscribe(msg => {
                  this.catchWebSocketEvents(msg)
                  console.log("Dashboard socket : ", msg);
                })
  }

  ngOnInit() {
   this.searchResults = [];
  }


filterItem(searchValue) {
  // console.log(searchValue);
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
    /*if (this.router.url.indexOf('/mission/') > -1) {
      return;
    }*/
    this.menuService.toggleMenu();
  }

  showAlerts() {
    // this.httpService.getAlerts().subscribe(alert => {
    //   const alertsModal = this.modalService.open(AlertsModalComponent, {size: 'lg', centered: true, backdrop: 'static'});
    //   alertsModal.componentInstance.alertsData = this.alerts;
    // });
  }

  setAletsAmountCyrcle() {
    setTimeout(() => {
      const $alerts = $('.alerts-amount');
      let width = 0;
      let containerWidth = 0;
      switch ($alerts.html().length) {
        case 1:
          width = 13;
          containerWidth = 8;
          break;
        case 2:
          width = 16;
          containerWidth = 11;
          break;
        case 3:
          width = 19;
          containerWidth = 14;
          break;
      }
      $alerts.height(width);
      $alerts.width(width);
      $('.navbar-alerts').width(containerWidth);
    });
  }

    catchWebSocketEvents(msg) {
      switch(Object.keys(msg.result)[0]) {
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
        case 'alerts':
        this.system.alerts = msg.result.alerts;
        break;
        case 'interceptor':
        this.system.interceptor = msg.result.interceptor;
        break;
        case 'search_result':
        this.searchResults.push(msg.result.search_result);
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
