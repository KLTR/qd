import { Component, Input, OnInit } from '@angular/core';
import { ConnectionService, HttpService } from '@app/services';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { environment } from './../../../../environments/environment.prod';
import { WsService } from './../../../services/websocket/ws.service';

@Component({
  selector: 'app-device-list-modal',
  templateUrl: './device-list-modal.component.html',
  styleUrls: ['./device-list-modal.component.scss']
})
export class DeviceListModalComponent implements OnInit {
  @Input() deviceList: any[];
  @Input() targetId;
  @Input() target;
  isPioneer: boolean;
  isConnected: boolean;
  isRefreshing = false;
  isAttackingOrChecking = false;
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
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

  checkDevice(deviceName, deviceId) {
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
        this.http.checkDevice(deviceId).subscribe(result => {
          console.log(result), (this.isAttackingOrChecking = false);
        });
      }
    });
  }

  attackDevice(deviceName, deviceId) {
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
        this.http.attackDevice(deviceId).subscribe(result => {
          console.log(result), (this.isAttackingOrChecking = false);
        });
      }
    });
  }

  abortDevice(deviceName, deviceId) {
    const confirmModal = this.modalService.open(ConfirmModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static'
    });
    confirmModal.componentInstance.title = 'Abort ';
    confirmModal.componentInstance.message = `Are you sure you want to abort attack on '${deviceName}'?`;
    confirmModal.result.then(res => {
      if (res) {
        this.http.abortDevice(deviceId).subscribe(result => {
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
        this.http.archiveTarget(this.targetId).subscribe(result => {
          console.log(result);
        });
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
        this.http.queryPioneerDevices(this.targetId).subscribe(result => {
          this.isRefreshing = true;
          console.log(result);
        });
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
          return
      }

      if (true) {
          //if (environment.debug) {
          console.log(msg.result);
      }

      switch (Object.keys(msg.result)[0]) {
      case 'pioneer_device':
          this.isRefreshing = false;
          this.handleDevice(msg.result.pioneer_device);
          break;
      }
  }

  handleDevice(device) {
    this.deviceList = this.deviceList.map(x => {
        if (x.id !== device.id) {
            return x;
        }

        return device;
    });
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
