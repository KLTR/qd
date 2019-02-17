import { environment } from './../../../../environments/environment.prod';
import { WsService } from './../../../services/websocket/ws.service';
import { HttpService, ConnectionService } from '@app/services';
import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  Observable,
  timer
} from 'rxjs';
import {
  map
} from 'rxjs/operators';

import {
  Store
} from '@ngrx/store';
import {
  NgbModal,
  NgbActiveModal
} from '@ng-bootstrap/ng-bootstrap';
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
    this.ws.messages.subscribe(msg => this.catchWebSocketEvents(msg))

  }

  ngOnInit() {
    if (!this.deviceList){
      this.deviceList = [];
    }
    this.connectionService.isPioneer.subscribe( res => this.isPioneer = res);
    this.connectionService.isInternet.subscribe( res => this.isConnected = res);
    console.log(this.deviceList);
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

  checkDevice(deviceId){
    this.http.checkDevice(deviceId).subscribe(res => console.log(res));
  }
  archiveTarget(){
    this.http.archiveTarget(this.targetId).subscribe(res=>console.log(res));
  }
  refreshTargetDevices(){
    this.http.refreshTargetDevices(this.targetId).subscribe(res=>console.log(res));
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
    if(!deviceStatus){
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
    if (msg.result) {
      if (environment.debug) {
        // console.log(msg.result);
      }
      switch (Object.keys(msg.result)[0]) {
        case 'pioneer_device':
          let device = msg.result.pioneer_device;
          if (this.targetId &&  device.target_id === this.targetId) { 
            this.handleDevice(device);           
          }
          break;
      }
    } else {
      console.log('err', msg.result);
    }
  }
handleDevice(device){
  this.deviceList = this.deviceList.filter((x) => {
    if (x.id !== device.id) {
      return x
    }
  });
  this.deviceList.unshift(device);
}
  // actBasedOnStatus(deviceId: string, deviceStatus: string): void {
  //   const deviceName = this.target.devices.filter(device => device.id === deviceId)[0].name;
  //   let confirmModal;
  //   if ((deviceStatus !== 'attacking' && this.target.maxActions === 0 && this.target.vectorState === 'OK')
  //     || ['OFF', 'INIT'].includes(this.target.vectorState)
  //     || (this.target.vectorState === 'NO_LICENSE' && deviceStatus !== 'attacking')
  //     || !this.isConnected)
  //     return;
  //   switch (deviceStatus) {
  //     case 'failed':
  //     case 'aborted':
  //     case 'offline':
  //     case 'terminated':
  //     case 'unknown':
  //       return this.setDeviceState(deviceId, 'loading');
  //     case 'active':
  //       confirmModal = this.modalService.open(StopModalComponent, { size: 'sm', centered: true, backdrop: 'static' });
  //       confirmModal.componentInstance.title = 'Attack';
  //       confirmModal.componentInstance.message = `Are you sure you want to attack '${deviceName}'?`;
  //       confirmModal.result.then(res => {
  //         if (res) this.setDeviceState(deviceId, 'attacking');
  //       });
  //       break;
  //     case 'attacking':
  //       confirmModal = this.modalService.open(StopModalComponent, { size: 'sm', centered: true, backdrop: 'static' });
  //       confirmModal.componentInstance.title = 'Abort';
  //       confirmModal.componentInstance.message = `Are you sure you want to abort attack on '${deviceName}'?`;
  //       confirmModal.result.then(res => {
  //         if (res) this.setDeviceState(deviceId, 'aborted');
  //       });
  //       break;
  //   }
  // }
  // setDeviceState(deviceId: string, nextState: string): void {
  //   this.http.modifyDeviceStatus(this.target.id, deviceId, nextState).subscribe();
  // }
}
