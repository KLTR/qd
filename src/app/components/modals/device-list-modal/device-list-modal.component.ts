import { Component, OnInit, Input } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  State,
  selectSystem
} from '@app/state/reducers';
import { Store } from '@ngrx/store';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-device-list-modal',
  templateUrl: './device-list-modal.component.html',
  styleUrls: ['./device-list-modal.component.scss']
})
export class DeviceListModalComponent implements OnInit {
  @Input() deviceList: any[];
  @Input() targetId;
  @Input() target;
  vectorState: boolean;
  now$: Observable<any> = timer(0, 1000).pipe(map(() => new Date()));
  isConnected: boolean;
  isRefreshing = false;
  isAttackingOrChecking = false;
  constructor(
    private store: Store < State >,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,

    ) { }

  ngOnInit() {
    this.store.select(selectSystem).pipe(map(system => system.internet.indicator.state === 'GREEN')).subscribe(connected => this.isConnected = connected);
    this.store.select(selectSystem).pipe(map(system => system.pioneer.indicator.state === 'GREEN')).subscribe(connected => {
      this.vectorState = connected
    })
    console.log(this.targetId);
    console.log(this.deviceList);
    this.deviceList = this.deviceList.map(
      (device: any) => device.infection
    )
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

  getDeviceIconSize(deviceStatus: string): number {
    switch (deviceStatus) {
      case 'offline':
      case 'active':
      case 'loading':
        return 30;
      default:
        return 38;
    }
  }

  getDeviceStatusText(deviceStatus: string): string {
    switch (deviceStatus) {
      case 'failed':
        this.isAttackingOrChecking = false;
        return 'Failed';
      case 'aborted':
        this.isAttackingOrChecking = false;
        return 'Aborted';
      case 'offline':
        this.isAttackingOrChecking = false;
        return 'Offline';
      case 'unknown':
        this.isAttackingOrChecking = false;
        return 'Not Recently Checked';
      case 'active':
        this.isAttackingOrChecking = false;
        return 'Ready to attack';
      case 'attacking':
        this.isAttackingOrChecking = true;
        return 'attacking';
      case 'unsupported':
        this.isAttackingOrChecking = false;
        return 'Not supported';
      case 'success':
        this.isAttackingOrChecking = false;
        return 'Successfull infection';
      case 'terminated':
        this.isAttackingOrChecking = false;
        return 'Agent terminated';
      case 'loading':
        this.isAttackingOrChecking = true;
        return 'Checking status (It may take a few minutes)...';
      default:
        this.isAttackingOrChecking = false;
        return '';
    }
  }
  getButtonText(deviceStatus: string): string {
    switch (deviceStatus) {
      case 'failed':
      case 'aborted':
      case 'offline':
      case 'terminated':
      case 'unknown':
        return 'check status';
      case 'active':
        return 'attack!';
      case 'attacking':
        return 'abort';
    }
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