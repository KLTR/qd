import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../../services/http/http.service';
import {Subscription} from 'rxjs';
// import { WebSocketCommonService } from '@quadream/ui-common';

@Component({
  selector: 'app-alerts-modal',
  templateUrl: './alerts-modal.component.html',
  styleUrls: ['./alerts-modal.component.scss']
})
export class AlertsModalComponent implements OnInit, OnDestroy {
  @Input() alertsData;
  showAll = false;
  filterBy: any;
  subscription: Subscription;
  sortBy = '-datetime';
  activeAlertsCount = 0;

  constructor(public activeModal: NgbActiveModal, private httpService: HttpService,
    //  private websocket: WebSocketCommonService
     ) {
  }

  ngOnInit() {
    // this.subscription = this.websocket.getSocketsFor('alert-created', 'alert-updated').subscribe((action: { type: string, eventdata: any }) => {
    //   this.catchWebSocketEvents(action);
    // });
    this.filterAlerts('active');
    this.countActiveAlerts();
  }

  filterAlerts(status) {
    this.showAll = !this.showAll;
    this.filterBy = status;
  }

  countActiveAlerts() {
    this.alertsData.forEach(alert => {
      if (alert.status === 'active') {
        this.activeAlertsCount += 1;
      }
    });
  }

  // deleteAlert(alert, index) {
  //   this.httpService.deleteAlert(alert.id).subscribe(() => {
  //   });
  //   this.alertsData.splice(index, 1);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sortByValue(sort: string) {
    if (sort === 'date' && (this.sortBy !== '-datetime' && this.sortBy !== '+datetime')) {
      this.sortBy = '-date';
    } else if (sort === 'date' && this.sortBy === '-datetime') {
      this.sortBy = '+datetime';
    } else if (sort === 'date' && this.sortBy === '+datetime') {
      this.sortBy = '-datetime';
    }
    if (sort === 'severity' && (this.sortBy !== '-severity' && this.sortBy !== '+severity')) {
      this.sortBy = '-severity';
    } else if (sort === 'severity' && this.sortBy === '-severity') {
      this.sortBy = '+severity';
    } else if (sort === 'severity' && this.sortBy === '+severity') {
      this.sortBy = '-severity';
    }
  }

  // catchWebSocketEvents(action: { type: string, eventdata: any }) {
  //   switch (action.type) {
  //     case 'alert-created':
  //       this.alertsData.push(action.eventdata);
  //       this.countActiveAlerts();
  //       break;
  //     case 'alert-updated':
  //       this.alertsData.forEach((alert, i) => {
  //         if (alert.id === action.eventdata.id) {
  //           this.alertsData[i] = action.eventdata;
  //         }
  //       });
  //       this.countActiveAlerts();
  //       break;
  //   }
  // }

}
