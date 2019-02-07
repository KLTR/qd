import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-device-tooltip',
  templateUrl: './device-tooltip.component.html',
  styleUrls: ['./device-tooltip.component.scss']
})
export class DeviceTooltipComponent implements OnInit, OnDestroy {
  @Input() device;
  @Output() close = new EventEmitter();
  deviceName: string;
  constructor() {}



  ngOnInit() {}

  closeTooltip() {
    this.close.emit();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
