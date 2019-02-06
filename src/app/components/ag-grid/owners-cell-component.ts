import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-owners-cell',
  template: `
  <span *ngIf="params">
    <span *ngFor="let param of params.value | keyvalue">
    {{param.key}}: {{param.value}}
    </span>
  </span>
  `,
  styleUrls: ['./template-renderer.component.scss']

})
export class OwnersCellComponent implements ICellRendererAngularComp {
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
