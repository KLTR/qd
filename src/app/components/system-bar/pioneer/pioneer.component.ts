import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmModalComponent } from '@app/components/modals/confirm-modal/confirm-modal.component';
import { HttpService } from '@app/services';
import { SatPopover } from '@ncstate/sat-popover';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-pioneer',
  templateUrl: './pioneer.component.html',
  styleUrls: ['./pioneer.component.scss']
})
export class PioneerComponent implements OnInit {
  @Input() pioneer: any;
  pioneerStatus: string;
  @ViewChild('pioneerPop') public pioneerPop: SatPopover;

  constructor(private modalService: NgbModal, private http: HttpService) {}

  ngOnInit() {
    this.getPioneerStatus();
    // console.log(this.pioneer);
  }

  getPioneerStatus() {
    if (this.pioneer) {
      if (this.pioneer.indicator.state === 'GREEN') {
        this.pioneerStatus = 'pioneer-green';
      } else {
        this.pioneerStatus = 'pioneer-red';
      }
    }
  }

  resetPioneerMachine(pioneer: any) {
    const confirmModal = this.modalService.open(ConfirmModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static'
    });
    confirmModal.componentInstance.title = 'Refresh';
    confirmModal.componentInstance.message = `Are you sure you want to reset '${pioneer.name}'?`;
    confirmModal.componentInstance.additionalText = `*last reset was ${moment(pioneer.updated_at).fromNow()}`;
    confirmModal.result.then(res => {
      if (res) {
        this.http.resetPioneerMachine(pioneer.name).subscribe(
          result => {
            console.log(result);
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }
}
