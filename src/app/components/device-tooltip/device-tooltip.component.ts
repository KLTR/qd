import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-device-tooltip',
  templateUrl: './device-tooltip.component.html',
  styleUrls: ['./device-tooltip.component.scss']
})
export class DeviceTooltipComponent implements OnInit,OnDestroy {
  @Input() device;
  @Output() close = new EventEmitter();
  isOpen: boolean;
  deviceName: string;
  constructor() { }


// tip:
// device: "iPhone X"
// ip: "192.191.11.1"
// mac: "00:xx:cc:11:dd"
// phone_number: "1111"

  ngOnInit() {
    console.log(this.isOpen);
    console.log(this.device);
      this.deviceName = this.device.name;
    if (!this.deviceName) {
      this.deviceName = 'Unknown';
    }

  }

  closeTooltip() {
    this.close.emit();
  }
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.isOpen = false;
}
}
