import { HttpService, AppConfigService } from '@app/services';
import { WsService } from './../../../services/websocket/ws.service';
import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
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
    this.selectedDateRange = 'all';
     this.config = this.appConfig.getConfig()
    this.fileUrl = `${this.config.apiUrl}/archives/${this.data.id}.zip`
    this.exportData = {
      progress: null,
      state: 'pending',
      download_file: `${this.data.file}.zip`,
      fileUrl: `${this.config.apiUrl}/archives/${this.data.id}.zip`,
      id: ''
    }
  }


  startExport(){
    console.log(this.selectedFormat);
    this.httpService.exportSource(this.data.id).subscribe(res => {
      this.isStartedExporting = true;
    });
  }

  selectFormat(format: string){
    this.selectedFormat = format;
  }

  selectDateRange(range: any){
    this.selectedDateRange = range;
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
    }  }

    catchWebSocketEvents(msg) {
      if (Object.keys(msg)[0] === 'error') {
        return;
      }
      switch (Object.keys(msg.result)[0]) {
        case 'export_status':
          this.exportData = msg.result.export_status;
          this.exportData.fileUrl = `${this.config.apiUrl}/archives/${this.data.id}.zip`;
          break;
        
      }
      // this.system = Object.assign({}, this.system);
    }


    onDateSelection(date: NgbDate) {
      this.isRangeSelected = false;
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
      } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
        this.toDate = date;
        console.log(this.fromDate);
        console.log(this.toDate);
        this.selectedDateRange = {
          from: this.fromDate,
          to: this.toDate
        }
        console.log(this.selectedDateRange);
        this.isRangeSelected = true;
      } else {
        this.toDate = null;
        this.fromDate = date;
      }
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
