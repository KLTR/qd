import { FilterAlertsPipe } from './../../../../pipes/filter-alerts.pipe';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../../services/http/http.service';
import {Subscription} from 'rxjs';
// import { WebSocketCommonService } from '@quadream/ui-common';
@Component({
  selector: 'app-alerts-modal',
  templateUrl: './alerts-modal.component.html',
  styleUrls: ['./alerts-modal.component.scss']
})
export class AlertsModalComponent implements OnInit {
  alertsData;
  filteredAlerts;
  @Input() isOpen;
  showAll = false;
  filterBy: any;
  subscription: Subscription;
  sortBy = '-datetime';
  activeAlertsCount = 0;


  columnDefs = [
    {headerName: 'CreatedAt', field: 'createdAt', sortable: true, filter: true,  },
    {headerName: 'Msg', field: 'msg', sortable: true, filter: true },
    {headerName: 'Owners', field: 'owners', sortable: true, filter: true},
    {headerName: 'Severity', field: 'severity', sortable: true, filter: true, comparator: this.severityComparator},
    {headerName: 'Status', field: 'status', sortable: true, filter: true,},
  ];

  rowData = [
    { createdAt: '09:30AM', msg:'System Alert', owners:'System', severity:'INFO', status:'active' },
    { createdAt: '12:30AM', msg:'Whatsapp Alert', owners:'Whatsapp', severity:'WARNING', status:'inactive' },
    { createdAt: '06:00PM', msg:'Hardware Alert', owners:'Hardware', severity:'MAJOR', status:'active'},
    { createdAt: '01:00PM', msg:'Intel Alert', owners:'Intel', severity:'CRITICAL', status:'inactive'},
    { createdAt: '04:20AM', msg:'Another system Alert', owners:'System', severity:'INFO', status:'active'},
  ];
  constructor(private httpService: HttpService,
    //  private websocket: WebSocketCommonService
     ) {
  }

  ngOnInit() {
    // this.subscription = this.websocket.getSocketsFor('alert-created', 'alert-updated').subscribe((action: { type: string, eventdata: any }) => {
    //   this.catchWebSocketEvents(action);
    // });
    this.alertsData = [
      { createdAt: '9:30AM',  msg:'System Alert', owners:'System', severity:'INFO', tags:[], importance: true, target_url:'', status:'active', name:'Target Name'},
      { createdAt: '12:30AM', msg:'Whatsapp Alert', owners:'Whatsapp', severity:'WARNING', tags:[], importance: true, target_url:'', status:'inactive', name:'Target Name'},
      { createdAt: '06:00PM', msg:'Hardware Alert', owners:'Hardware', severity:'MAJOR', tags:[], importance: true, target_url:'', status:'active', name:'Target Name'},
      { createdAt: '01:00PM', msg:'Intel Alert', owners:'Intel',tags:[], severity:'CRITICAL', importance: true, target_url:'', status:'inactive', name:'Target Name'},
      { createdAt: '04:20AM', msg:'Another system Alert', owners:'System', severity:'INFO', tags:[], importance: true, target_url:'', status:'active', name:'Target Name'},
    ]
    this.countActiveAlerts();
    this.filterAlerts('active');
  }

  filterAlerts(status) {
      if(!status || status === ''){
       this.filteredAlerts = this.alertsData.slice();
       this.showAll = false;
      } else {
        this.filteredAlerts = this.alertsData.filter(item => item.status === status)
        this.showAll = true;
      }
  }

  countActiveAlerts() {
    this.activeAlertsCount = 0;
    if(this.alertsData){
      if(this.alertsData.length > 0){
        this.alertsData.forEach(alert => {
          if (alert.status === 'active') {
            this.activeAlertsCount += 1;
          }
        });
      }
    }
  }

  deleteAlert(alert, index) {
    // this.httpService.deleteAlert(alert.id).subscribe(() => {
    // });
    let indexOg = this.alertsData.indexOf(alert);
    let indexFd = this.filteredAlerts.indexOf(alert);
    if(indexOg != -1){
      this.filteredAlerts.splice(indexFd,1);
    }
    this.alertsData.splice(indexOg, 1);
    this.countActiveAlerts();
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

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




severityComparator(s1, s2): number{

  function severityToNumber(severity): number{
    switch (severity){
      case 'CRITICAL':
      return 1;
      case 'MAJOR':
      return 2
      case 'WARNING':
      return 3;
      case 'INFO':
      return 4
    }
  }

  let severityNumber1 = severityToNumber(s1);
  let severityNumber2 = severityToNumber(s2);

  return severityNumber1 - severityNumber2;
}
}
