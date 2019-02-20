
import {
  WsService,
  HttpService,
  ConnectionService
} from '@app/services';
import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import {
  NgbModal,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';

import {
  DeviceListModalComponent
} from './../device-list-modal/device-list-modal.component'
@Component({
  selector: 'app-add-target-wizard',
  templateUrl: './add-target-wizard.component.html',
  styleUrls: ['./add-target-wizard.component.scss']
})
export class AddTargetWizardComponent implements OnInit {
  isEmpty = true;
  defaults = [];
  error: any = {};
  hasErrors = false;
  isConnected: boolean;
  isPionnerConnected: boolean;
  vector: any;
  isLoading = false;
  identifiers: any;
  selectedType: any
  targetId: any;

  @Input() devices: [];
  constructor(
    public activeModal: NgbActiveModal,
    private httpService: HttpService,
    private modalService: NgbModal,
    private ws: WsService,
    private connectionService: ConnectionService
  ) {
    this.ws.messages.subscribe(msg => this.catchWebSocketEvents(msg))
    this.vector = {
      name: "X-Caliber",
      license: {
        used: 10,
        total: 100,
        tip: "Tip"
      },
      vectorStateTip: "",
      vectorState: "",
      vectorType: 'x-caliber',
      inputs: [{
        identifiers: []
      }],
      identifier: ""
    }
    this.error = null;
    this.selectedType = 'email';
    this.identifiers = [{
      type: this.selectedType,
      value: this.vector.identifier
    }]
    this.connectionService.isPioneer.subscribe(res => { this.isPionnerConnected = res});
  }

  ngOnInit() {
  }

  addTarget() {
    this.identifiers = {
      identifiers: [{
        type: this.selectedType,
        value: this.vector.identifier
      }]
    }

    this.httpService.createTarget(this.identifiers).subscribe(
      (targetId: any) => {
        console.log(targetId);
        this.isLoading = true;
        this.targetId = targetId;
      },
      err => {
        console.log(err), this.activeModal.close()
      }
    )
  }


  trackVectors(index, item) {
    return item.id ? item.id : index;
  }

  validateIdentifier(input: string) {
    if (!input) {
      this.error = `${this.selectedType} is required`;
      this.setHasError()
      return
    }
    if (input.length > 0) {
      if (this.selectedType === "phone") {
        const phoneRegex = new RegExp(/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{9,14}$/);
        if (!phoneRegex.test(input)) {
          this.error = 'Invalid phone number';
        } else {
          this.error = null;
          this.vector.identifier = input;
        }
      } else {
        const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!emailRegex.test(input)) {
          this.error = 'Invalid email address';
        } else {
          this.error = null;
          this.vector.identifier = input;
        }
      }
      this.isEmpty = false;
    }
    this.setHasError();
  }

  setHasError() {
    if (this.error) {
      this.hasErrors = true;
    } else {
      this.hasErrors = false;
    }
  }
  catchWebSocketEvents(msg) {
    if (Object.keys(msg)[0] === 'error') {
      return;
    }
    if (msg.result) {
      switch (Object.keys(msg.result)[0]) {
        case 'pioneer_device':
          let device = msg.result.pioneer_device;
          if (this.targetId &&  device.target_id === this.targetId) {
            this.activeModal.close();
            let deviceListModalRef = this.modalService.open(DeviceListModalComponent, {
              centered: true,
              size: 'lg',
              backdrop: 'static'
            });
            deviceListModalRef.componentInstance.deviceList = [device];
            deviceListModalRef.componentInstance.targetId = this.targetId;
          }
          break;
        case 'target':
          let target = msg.result.target;
          if (target.state === "PENDING") {
            this.targetId = target.target.id;
            this.isLoading = true;
          }
      }
    } else {
      console.log('err', msg.result);
    }
  }
}
