import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.scss']
})
export class BatteryComponent implements OnInit {
  @Input() goat: any;
  batteryStatus: string;
  constructor() {}

  ngOnInit() {
    this.getBatteryMode();
  }
  ngOnChanges(changes: any): void {
    this.getBatteryMode();
  }
  getBatteryMode() {
    if (this.goat) {
      switch (this.goat.indicator.state) {
        case 'GREEN':
          this.batteryStatus = 'battery-full';
          break;
        case 'YELLOW':
          this.batteryStatus = 'battery-mid';
          break;
        case 'RED':
          this.batteryStatus = 'battery-low';
          break;
        default:
          this.batteryStatus = 'battery-low';
        // Chargin icon
        //   this.batteryStatus = 'power-on';
        //   break;
      }
    }
  }
}
