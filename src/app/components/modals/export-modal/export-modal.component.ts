import { HttpService, AppConfigService } from '@app/services';
import { WsService } from './../../../services/websocket/ws.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-export-modal',
  styleUrls: ['./export-modal.component.scss'],
  templateUrl: './export-modal.component.html'
})
export class ExportModalComponent implements OnInit {
  @Input() dataType: string;
  @Input() data: any; //source
  exportData: any;
  fileUrl: any;
  config: any;
  isStartedExporting = false;
  selectedFormat = 'Protobuf';
  selectedDateRange: any;
  isRangeSelected = false;
  constructor(
    private appConfig: AppConfigService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private httpService: HttpService,
    private ws: WsService,
  ) {
    this.ws.messages.subscribe(msg => this.catchWebSocketEvents(msg))
  }

  ngOnInit() {
    this.httpService.getConfig().subscribe()
     this.config = this.appConfig.getConfig()
    // this.fileUrl = `${this.config.apiUrl}/archives/${this.data.id}.zip`
    this.exportData = {
      progress: null,
      state: 'pending',
      fileUrl: ``,
      id: ''
    }
  }
setDate(date){
  this.selectDateRange = date;
  console.log(date);
}

  startExport(){
    let exportObj = {
      format: this.selectedFormat,
      isRange: this.isRangeSelected,
      range: this.selectedDateRange,
    }
    this.httpService.exportSource(this.data.id,exportObj).subscribe(res => {
      this.isStartedExporting = true;
      this.exportData.id = res.id;
      this.fileUrl =  `${this.config.apiUrl}/archives/${this.exportData.id}.zip`
    });
  }

  selectFormat(format: string){
    this.selectedFormat = format;
  }

  selectDateRange(range: any){
    if(range === 'all'){
      this.isRangeSelected = false;
      return;
    }
    else{
      this.isRangeSelected = true;
    }
  }

  cancelExport(){
    if (this.exportData.progress && this.exportData.progress < 100) {
      const confirmModal = this.modalService.open(ConfirmModalComponent, { size: 'sm', centered: true, backdrop: 'static' });
      confirmModal.componentInstance.title = 'Cancel Export';
      confirmModal.componentInstance.message = 'Are you sure you want to cancel this export?';
      confirmModal.result.then((result) => {
        if (result) {
          this.httpService.abortExport(this.exportData.id).subscribe(() => {
            this.activeModal.close();
          });
        }
      });
    } else {
      this.activeModal.close();
    }  
  }

    catchWebSocketEvents(msg) {
      if (Object.keys(msg)[0] === 'error') {
        return;
      }
      switch (Object.keys(msg.result)[0]) {
        case 'export_status':
          this.exportData.state = msg.result.export_status.state;
          break;
      }
      // this.system = Object.assign({}, this.system);
    }
}
