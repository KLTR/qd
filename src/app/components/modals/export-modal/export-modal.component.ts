import { HttpService } from '@app/services';
import { WsService } from './../../../services/websocket/ws.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-export-modal',
  styleUrls: ['./export-modal.component.scss'],
  templateUrl: './export-modal.component.html'
})
export class ExportModalComponent implements OnInit {
  @Input() dataType: string;
  @Input() data: any;
  exportData: any;
  fileUrl = 'https://www.sample-videos.com/zip/10mb.zip';
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private httpService: HttpService,
    private ws: WsService,
  ) {
    this.ws.messages.subscribe(msg => this.catchWebSocketEvents(msg))
  }

  ngOnInit() {
    this.exportData = {
      progress: 24
    }
    console.log(this.data);
  }

  cancelExport(){
    if (this.exportData.progress && this.exportData.progress < 100) {
      const confirmModal = this.modalService.open(ConfirmModalComponent, { size: 'sm', centered: true, backdrop: 'static' });
      confirmModal.componentInstance.title = 'Cancel Export';
      confirmModal.componentInstance.message = 'Are you sure you want to cancel this export?';
      confirmModal.result.then((result) => {
        if (result) {
          // this.httpService.cancelExport(this.exportId).subscribe(() => {
            this.activeModal.close();
          // });
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
        // System 
        case 'export_data':
          this.exportData = msg.result.exportData;
          break;
        
      }
      // this.system = Object.assign({}, this.system);
    }
}
