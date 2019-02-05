import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-date-cell',
  template: `
  <span *ngIf="params">
    {{params.value | amDateFormat:'DD.MM.YYYY HH:mm'}}
  </span>
  `,
  styleUrls: ['./template-renderer.component.scss']

})
export class DateCellComponent implements ICellRendererAngularComp {
 params: any;
refresh(params: any): boolean {
  this.params = params;
  return true;
}

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.refresh(params);
  }
}
