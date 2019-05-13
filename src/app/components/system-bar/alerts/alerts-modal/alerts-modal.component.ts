import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DateCellComponent } from '@app/components/ag-grid/date-cell-component';
import { TemplateRendererComponent } from '@app/components/ag-grid/template-renderer.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GridApi, GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { HttpService } from '../../../../services/http/http.service';
import { WsService } from './../../../../services/websocket/ws.service';
@Component({
  selector: 'app-alerts-modal',
  templateUrl: './alerts-modal.component.html',
  styleUrls: ['./alerts-modal.component.scss']
})
export class AlertsModalComponent implements OnInit {
  filteredAlerts;
  @Input() alerts;
  @ViewChild('deleteCell') deleteCell: TemplateRef<any>;
  @ViewChild('ownersCell') ownersCell: TemplateRef<any>;
  @ViewChild('dateCell') dateCell: TemplateRef<any>;
  showAll = false;
  filterBy: any;
  subscription: Subscription;
  sortBy = '-datetime';
  activeAlertsCount = 0;
  icons: any;
  private gridApi: GridApi;
  rowData: any;
  columnDefs: any;
  rowClassRules: any;
  gridOptions: GridOptions;

  constructor(public activeModal: NgbActiveModal, private httpService: HttpService, private ws: WsService) {
    this.ws.messages.subscribe(msg => this.catchWebSocketEvents(msg));
  }

  ngOnInit() {
    this.gridOptions = {
      pagination: true,
      paginationPageSize: 12,
      defaultColDef: {
        filter: false,
        sortable: true,
        resizable: true
      },
      // TODO: which unique ID field can be chosen from the data
      getRowNodeId: function(data) {
        return data.id;
      },
      rowClassRules: {
        closed: params => {
          return params.data.status === 'inactive';
        }
      },
      columnDefs: [
        {
          headerName: 'Date',
          field: 'created_at',
          sortable: true,
          filter: 'date',
          filterParams: {
            browserDatePicker: true,
            comparator: function(filterLocalDateAtMidnight, cellValue) {
              const dateAsString = moment(cellValue).format('DD/MM/YYYY');
              const dateParts = dateAsString.split('/');
              const cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
              console.log(filterLocalDateAtMidnight);
              if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
              }
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              }
              if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              }
            }
          },
          cellRendererFramework: DateCellComponent,
          cellRendererParams: {
            ngTemplate: this.ownersCell
          },
          cellClassRules: {
            'critical-border': function(params) {
              return params.data.severity === 'CRITICAL' || params.data.severity === 'FATAL';
            },
            'info-border': function(params) {
              return params.data.severity === 'INFO';
            },
            'major-border': function(params) {
              return params.data.severity === 'MAJOR';
            }
          }
        },
        {
          headerName: 'Msg',
          field: 'msg',
          sortable: true,
          resizable: true
        },
        {
          headerName: 'Severity',
          field: 'severity',
          sortable: true,
          filter: true,
          comparator: this.severityComparator,
          cellClassRules: {
            'EVENT-CRITICAL': function(params) {
              return params.value === 'CRITICAL' || params.value === 'FATAL';
            },
            'EVENT-MAJOR': function(params) {
              return params.value === 'MAJOR';
            },
            'EVENT-INFO': function(params) {
              return params.value === 'INFO';
            },
            'EVENT-MINOR': function(params) {
              return params.value === 'MINOR';
            }
          }
        },
        {
          headerName: '',
          colId: 'delete',
          cellRendererFramework: TemplateRendererComponent,
          width: 105,
          cellRendererParams: {
            ngTemplate: this.deleteCell
          }
        }
      ],
      onFirstDataRendered: params => params.api.sizeColumnsToFit()
    };

    console.log(this.alerts);
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }

  clearFilters() {
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
  }

  delete(row: any) {
    this.httpService.dismissEvent(row.id).subscribe(res => {
      console.log(res);
      const index: number = this.alerts.indexOf(row);
      if (index !== -1) {
        this.alerts.splice(index, 1);
        // trigger alerts on change
        this.alerts = this.alerts.slice();
      }
    });
  }

  severityComparator(s1, s2): number {
    function severityToNumber(severity): number {
      switch (severity) {
        case 'CRITICAL':
          return 1;
        case 'MAJOR':
          return 2;
        case 'WARNING':
          return 3;
        case 'INFO':
          return 4;
      }
    }

    const severityNumber1 = severityToNumber(s1);
    const severityNumber2 = severityToNumber(s2);

    return severityNumber1 - severityNumber2;
  }

  catchWebSocketEvents(msg) {
    if (Object.keys(msg)[0] === 'error') {
      return;
    }
    switch (Object.keys(msg.result)[0]) {
      case 'new_alert':
        console.log(msg.result.new_alert);
        this.alerts.unshift(msg.result.new_alert);
        this.alerts = this.alerts.slice();
        break;
    }
  }
}
