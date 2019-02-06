import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  HttpService
} from '../../../../services/http/http.service';
import {
  Subscription
} from 'rxjs';
import { TemplateRendererComponent } from '@app/components/ag-grid/template-renderer.component';
import { OwnersCellComponent } from '@app/components/ag-grid/owners-cell-component';

import { GridOptions, GridApi } from 'ag-grid-community';
import { DateCellComponent } from '@app/components/ag-grid/date-cell-component';
@Component({
  selector: 'app-alerts-modal',
  templateUrl: './alerts-modal.component.html',
  styleUrls: ['./alerts-modal.component.scss']
})
export class AlertsModalComponent implements OnInit {
  filteredAlerts;
  @Input() isOpen;
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


  
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.columnDefs = [
      {
        headerName: 'Date',
        field: 'created_at',
        sortable: true,
        filter: 'agDateColumnFilter',
        width: 150,
        cellRendererFramework: DateCellComponent,
        cellRendererParams: {
          ngTemplate: this.ownersCell
        },
        cellClassRules: {
          "critical-border": function(params){
              return params.data.severity === 'CRITICAL';
          },
          "info-border": function(params){
            return params.data.severity === 'INFO';
         },
          "major-border": function(params){
              return params.data.severity === 'MAJOR';
        }
      }
      },
      {
        headerName: 'Owners',
        field: 'owners',
        sortable: true,
        filter: true,
        width:250,
        resizable:true,
        cellRendererFramework: OwnersCellComponent,
        cellRendererParams: {
          ngTemplate: this.ownersCell
        }
      },
      {
        headerName: 'Msg',
        field: 'msg',
        sortable: true,
        width: 600,
        resizable: true
        
      },
      {
        headerName: 'Severity',
        field: 'severity',
        sortable: true,
        filter: true,
        width: 135,
        comparator: this.severityComparator,
        cellClassRules: {
          "WARNING": function (params) {
            return params.value === 'CRITICAL';
          },
          "MAJOR": function (params) {
            return params.value === 'MAJOR';
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
    ];
    this.rowData = [{
      created_at: '2018-02-04T14:52:31.731441376Z',
      msg: 'System Alert',
      owners: {Target: 'Donald Trump',License: 'Daily'},
      severity: 'INFO',
    },
    {
      created_at: '2019-01-04T14:51:39.731441376Z',
      msg: 'Whatsapp Alert',
      owners: {Target: 'Donald Trump',License: 'Daily'},
      severity: 'MAJOR',
    },
    {
      created_at: '2019-02-05T14:55:39.731441376Z',
      msg: 'Hardware Alert',
      owners: {Target: 'Donald Trump',License: 'Daily'},
      severity: 'MAJOR',
    },
    {
      created_at: '2019-03-12T22:52:39.731441376Z',
      msg: 'Intel Alert',
      owners: {Target: 'Donald Trump',License: 'Daily'},
      severity: 'CRITICAL',
    },
    {
      created_at: '2019-02-05T14:52:39.731441376Z',
      msg: 'Another system Alert',
      owners: {Target: 'Donald Trump',License: 'Daily'},
      severity: 'INFO',
    },
  ];

  this.rowClassRules = {
    "closed" : (params) => {
      return params.data.status === 'inactive'
    }
  }
    this.icons = {
      menu: '<i class="fa fa-filter" style="width: 10px;" />',
      filter: '<i class="fa fa-filter"/>',
      sortAscending: '<i class="fa fa-long-arrow-down"/>',
      sortDescending: '<i class="fa fa-long-arrow-up"/>',
    }
    this.countActiveAlerts();
  }
onGridReady(params){
  this.gridApi = params.api;
}

  clearFilters() {
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
  }
  countActiveAlerts() {
    this.activeAlertsCount = 0;
    if (this.rowData) {
      if (this.rowData.length > 0) {
        this.rowData.forEach(alert => {
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
    let indexOg = this.rowData.indexOf(alert);
    let indexFd = this.filteredAlerts.indexOf(alert);
    if (indexOg != -1) {
      this.filteredAlerts.splice(indexFd, 1);
    }
    this.rowData.splice(indexOg, 1);
    this.countActiveAlerts();
  }


  delete(row){
    // TODO: 
    // this.http.deleteAlert(row.id);
    this.gridApi.redrawRows();
  }


  severityComparator(s1, s2): number {

    function severityToNumber(severity): number {
      switch (severity) {
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
