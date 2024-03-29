import { Component, Input, OnInit } from '@angular/core';
import { ConnectionService, HttpService } from '@app/services';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { WsService } from './../../../services/websocket/ws.service';

@Component({
  selector: 'app-device-list-modal',
  templateUrl: './device-list-modal.component.html',
  styleUrls: ['./device-list-modal.component.scss']
})
export class DeviceListModalComponent implements OnInit {
  @Input() deviceList: any[];
  @Input() target;
  isPioneer: boolean;
  isConnected: boolean;
  isRefreshing = false;
  isAttackingOrChecking = false;
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private http: HttpService,
    private ws: WsService,
    private connectionService: ConnectionService
  ) {
    this.ws.messages.subscribe(msg => this.catchWebSocketEvents(msg));
  }

  ngOnInit() {
    if (!this.deviceList) {
      this.deviceList = [];
    }
    this.connectionService.isPioneer.subscribe(res => (this.isPioneer = res));
    this.connectionService.isInternet.subscribe(res => (this.isConnected = res));
  }
  getAnimatedIcon(name: string): any {
    return {
      path: `assets/svg-jsons/${name}.json`,
      autoplay: true,
      loop: true,
      rendererSettings: {
        progressiveLoad: false,
        preserveAspectRatio: 'xMidYMid meet'
      }
    };
  }

  checkDevice(deviceName: string, deviceId: string) {
    const confirmModal = this.modalService.open(ConfirmModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static'
    });
    confirmModal.componentInstance.title = 'Check';
    confirmModal.componentInstance.message = `Are you sure you want to check '${deviceName}'?`;
    confirmModal.result.then(res => {
      if (res) {
        this.isAttackingOrChecking = true;
        this.http.checkDevice(this.target.id, deviceId).subscribe(result => {
          console.log(result), (this.isAttackingOrChecking = false);
        });
      }
    });
  }

  attackDevice(deviceName: string, deviceId: string) {
    const confirmModal = this.modalService.open(ConfirmModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static'
    });
    confirmModal.componentInstance.title = 'Attack ';
    confirmModal.componentInstance.message = `Are you sure you want to attack '${deviceName}'?`;
    confirmModal.result.then(res => {
      if (res) {
        this.isAttackingOrChecking = true;
        this.http.attackDevice(this.target.id, deviceId).subscribe(result => {
          console.log(result), (this.isAttackingOrChecking = false);
        });
      }
    });
  }

  abortDevice(deviceName: string, deviceId: string) {
    const confirmModal = this.modalService.open(ConfirmModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static'
    });
    confirmModal.componentInstance.title = 'Abort ';
    confirmModal.componentInstance.message = `Are you sure you want to abort attack on '${deviceName}'?`;
    confirmModal.result.then(res => {
      if (res) {
        this.http.abortDevice(this.target.id, deviceId).subscribe(result => {
          console.log(result);
        });
      }
    });
  }
  archiveTarget() {
    const confirmModal = this.modalService.open(ConfirmModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static'
    });
    confirmModal.componentInstance.title = 'Archive';
    confirmModal.componentInstance.message = `Are you sure you want to archive '${this.target.name}'?`;
    confirmModal.result.then(res => {
      if (res) {
        this.http.archiveTarget(this.target.id).subscribe(
          result => {
            console.log(result);
            this.activeModal.close();
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }
  queryPioneerDevices() {
    const confirmModal = this.modalService.open(ConfirmModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static'
    });
    confirmModal.componentInstance.title = 'Refresh';
    confirmModal.componentInstance.message = `Are you sure you want to refresh '${this.target.name}'?`;
    confirmModal.result.then(res => {
      if (res) {
        this.isRefreshing = true;
        this.http.queryPioneerDevices(this.target.id).subscribe(
          result => {
            this.isRefreshing = false;
            console.log(result);
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }

  getDeviceIconSize(deviceStatus: string): number {
    if (!deviceStatus) {
      return;
    }
    switch (deviceStatus.toLowerCase()) {
      case 'offline':
      case 'ready':
      case 'created':
        return 30;
      default:
        return 34;
    }
  }

  getDeviceStatusText(deviceStatus: string): string {
    if (!deviceStatus) {
      return;
    }
    switch (deviceStatus.toLowerCase()) {
      case 'failed':
        // this.isAttackingOrChecking = false;
        return 'Failed';
      case 'aborted':
        // this.isAttackingOrChecking = false;
        return 'Aborted';
      case 'offline':
        // this.isAttackingOrChecking = false;
        return 'Offline';
      case 'unknown':
        // this.isAttackingOrChecking = false;
        return 'Not Recently Checked';
      case 'ready':
        // this.isAttackingOrChecking = false;
        return 'Ready to attack';
      case 'attacking':
        // this.isAttackingOrChecking = true;
        return 'attacking';
      case 'not_supported':
        // this.isAttackingOrChecking = false;
        return 'Not supported';
      case 'completed':
        // this.isAttackingOrChecking = false;
        return 'Successfull infection';
      case 'terminated':
        // this.isAttackingOrChecking = false;
        return 'Agent terminated';
      case 'created':
      case 'checking':
        // this.isAttackingOrChecking = true;
        return 'Checking status (It may take a few minutes)...';
      default:
        // this.isAttackingOrChecking = false;
        return '';
    }
  }
  getButtonText(deviceStatus: string): string {
    if (!deviceStatus) {
      return;
    }
    switch (deviceStatus.toLowerCase()) {
      case 'failed':
      case 'aborted':
      case 'offline':
      case 'terminated':
      case 'unknown':
        return 'check status';
      case 'ready':
        return 'attack!';
      case 'attacking':
        return 'abort';
    }
  }

  catchWebSocketEvents(msg) {
    if (Object.keys(msg)[0] === 'error') {
      return;
    }

    if (!msg.result) {
      return;
    }
    switch (Object.keys(msg.result)[0]) {
      case 'pioneer_device':
        const device = msg.result.pioneer_device;
        this.isRefreshing = false;
        console.log('pioneer_device:', device);
        if (!device) {
          return;
        }
        this.handleDevice(device);
        break;
    }
  }

  handleDevice(device) {
    this.deviceList = this.deviceList.filter(x => {
      if (x.id !== device.id) {
        return x;
      }
    });
    this.deviceList.unshift(device);
    console.log(this.deviceList);
  }

  actBasedOnStatus(device: any): void {
    const deviceName = device.name;
    const deviceStatus = device.state;
    const deviceId = device.id;
    switch (deviceStatus.toLowerCase()) {
      case 'failed':
      case 'aborted':
      case 'offline':
      case 'terminated':
      case 'unknown':
        return this.checkDevice(deviceName, deviceId);
      case 'ready':
        return this.attackDevice(deviceName, deviceId);
      case 'attacking':
        return this.abortDevice(deviceName, deviceId);
    }
  }
}
