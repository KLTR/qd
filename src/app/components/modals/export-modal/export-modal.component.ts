import { HttpService, AppConfigService } from '@app/services';
import { WsService } from './../../../services/websocket/ws.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
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
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  isDpShown = false;
  isRangeSelected = false;
  @ViewChild('d') public datePicker: NgbDatepicker;
  constructor(
    private calendar: NgbCalendar,
    private appConfig: AppConfigService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private httpService: HttpService,
    private ws: WsService,
  ) {
    this.ws.messages.subscribe(msg => this.catchWebSocketEvents(msg))
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
     this.config = this.appConfig.getConfig()
    // this.fileUrl = `${this.config.apiUrl}/archives/${this.data.id}.zip`
    this.exportData = {
      progress: null,
      state: 'pending',
      fileUrl: ``,
      id: ''
    }
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
      this.isDpShown = false;
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
          this.exportData.state = msg.result.export_status;
          break;
      }
      // this.system = Object.assign({}, this.system);
    }

 
    onDateSelection(date: NgbDate) {
      this.selectedDateRange = null;
      this.isDpShown = true;
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
      } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
        this.toDate = date;
        this.selectedDateRange = {
          from: `${this.fromDate.day}/${this.fromDate.month}/${this.fromDate.year}`,
          to: `${this.toDate.day}/${this.toDate.month}/${this.toDate.year}`,
        }
        this.isDpShown = false;
      } else {
        this.toDate = null;
        this.fromDate = date;
      }
    }
  applyDate(){
    this.isDpShown = false;
  }
    isHovered(date: NgbDate) {
      return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }
  
    isInside(date: NgbDate) {
      return date.after(this.fromDate) && date.before(this.toDate);
    }
  
    isRange(date: NgbDate) {
      return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
    }
}
