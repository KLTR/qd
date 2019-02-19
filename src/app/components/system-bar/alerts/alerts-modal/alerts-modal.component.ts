import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  public overlayNoRowsTemplate: string;

  
  constructor(
    public activeModal: NgbActiveModal,
    private httpService: HttpService
    ) {
    this.overlayNoRowsTemplate = "<span>No Alerts To Show</span>";
  }
ngOnChanges(): void {
  console.log(this.alerts);
  this.gridApi.redrawRows();
}
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
              return params.data.severity === 'CRITICAL' || params.data.severity === 'FATAL';
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
        width:260,
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
            return params.value === 'CRITICAL' || params.value === 'FATAL';;
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
  }
onGridReady(params){
  this.gridApi = params.api;
  
}

  clearFilters() {
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
  }


  delete(row: any){
    this.httpService.dismissAlert(row.id).subscribe( res => console.log(res));
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
