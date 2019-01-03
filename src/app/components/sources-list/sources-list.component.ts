import { HttpService } from '@app/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sources-list',
  templateUrl: './sources-list.component.html',
  styleUrls: ['./sources-list.component.scss']
})
export class SourcesListComponent implements OnInit {

  missionData: any;
  temp: any;
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getActiveMission().subscribe( res => 
      {
        console.log(res),
        this.temp = res,
        this.setPendingDevicesArray()
      })
  }

  setPendingDevicesArray(){
    let pending : any[];
    pending = this.temp.pending_devices;
    for(let i = 0 ; i < pending.length ; i++){
      switch(Object.keys(pending[i])[0]){
        case 'pioneer':
        pending[i] = {...pending[i].pioneer, vectorType: 'pioneer'}
        break;
      }
    }
    this.temp.pending_devices = pending;
    this.missionData = this.temp;
      console.log(this.missionData);
  }
  getBatteryIcon(battery) {
    if (battery <= 20) {
      return 'device-battery-empty';
    }
    return 'device-battery-full';
  }

  getWifiSignal(wifi) {
      switch (wifi) {
        case 4:
          return 'signal_full';
        case 3:
          // this.device.indicators.wifiTooltip = 'Excellent';
          return 'signal_full';
        case 2:
          // this.device.indicators.wifiTooltip = 'Good';
          return 'signal_middle';
        case 1:
          // this.device.indicators.wifiTooltip = 'Bad';
          return 'signal_low';
        case 0:
          // this.device.indicators.wifiTooltip = 'Communication lost with device';
          return 'signal-no';
      
    }
  }

}
