import { HttpService, WsService } from '@app/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sources-list',
  templateUrl: './sources-list.component.html',
  styleUrls: ['./sources-list.component.scss']
})
export class SourcesListComponent implements OnInit {

  missionData: any;
  events: any[];
  temp: any;
  constructor(
    private http: HttpService,
    private ws: WsService,

    ){
     this.ws.messages.subscribe(msg => {
        this.catchWebSocketEvents(msg)
        console.log("Dashboard socket : ", msg);
      })
}

  ngOnInit() {
    this.events = [];
    this.http.getActiveMission().subscribe( res => 
      {
        console.log(res);
        this.missionData = res;
        // this.temp = res,
        // this.setPendingDevicesArray()
      })
  }

  // setPendingDevicesArray(){
  //   let pending : any[];
  //   pending = this.temp.pending_devices;
  //   for(let i = 0 ; i < pending.length ; i++){
  //     switch(Object.keys(pending[i])[0]){
  //       case 'pioneer':
  //       pending[i] = {...pending[i].pioneer, vectorType: 'pioneer'}
  //       break;
  //     }
  //   }
  //   this.temp.pending_devices = pending;
  //   this.missionData = this.temp;
  // }
  // getBatteryIcon(battery) {
  //   if (battery <= 20) {
  //     return 'device-battery-empty';
  //   }
  //   return 'device-battery-full';
  // }

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


  setAnimatedIcon() {
        return {
          height: 27,
          width: 27,
          options: {
            path: 'assets/svg-jsons/initializing.json',
            autoplay: true,
            loop: true,
            rendererSettings: {
              progressiveLoad: true,
              preserveAspectRatio: 'xMidYMid meet',
          }
        }
      }
    }
  catchWebSocketEvents(msg) {
    switch(Object.keys(msg.result)[0]) {
      case 'target':
      this.missionData.targets.push(msg.result.target);
      this.missionData = Object.assign({}, this.missionData);
      break;
      case 'infection':
      this.missionData.infections.push(msg.result.infection);
      this.missionData = Object.assign({}, this.missionData);
      break;
      case 'source':
      this.missionData.sources.push(msg.result.source);
      this.missionData = Object.assign({}, this.missionData);
      break;
      case 'event':
      this.events.push(msg.result.event.log);
      this.events = this.events.slice();
      break;
      case 'alert':
      return;
    }
  }
}
