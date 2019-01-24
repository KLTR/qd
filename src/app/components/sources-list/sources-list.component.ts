import { HttpService, WsService } from '@app/services';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
      })
}

  ngOnInit() {
    this.events = [];
    this.http.getActiveMission().subscribe( res => 
      {
        this.missionData = res;
        if(!this.missionData.sources){
          this.missionData.sources = [];
        }
        if(!this.missionData.targets){
          this.missionData.targets = [];
        }
        if(!this.missionData.infections){
          this.missionData.infections = [];
        }
      })
    this.http.getEvents().subscribe(res => {
      this.events = res;
    })
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
    if(Object.keys(msg)[0] === 'error'){
      return;
    }
    if(msg.result){
      
      switch(Object.keys(msg.result)[0]) {
        case 'target':
        console.log(msg.result.target);
        this.missionData.targets.push(msg.result.target);
        this.missionData = Object.assign({}, this.missionData);
        break;
        case 'infection':
        this.handleInfection(msg.result.infection);
        this.missionData = Object.assign({}, this.missionData);
        console.log(this.missionData.infections);
        break;
        case 'source':
        this.missionData.sources.push(msg.result.source);
        this.missionData = Object.assign({}, this.missionData);
        break;
        case 'event':
        this.events.push(msg.result.event.log);
        this.events = this.events.slice();
        break;
      }
    } else{
      console.log('err', msg.result);
    }
  }

  handleInfection(infection){
    let infectionObj = infection.infection; 
    if(!infectionObj.state){
      return;
    }
    if(infectionObj.state === 'IN_PROGRESS'){
      this.missionData.infections.push(infection);
      return;
    }
     else {
      this.missionData.infections = this.missionData.infections.filter( (x) => { if(x.infection.id !== infectionObj.id){ return x}});
      if(infectionObj.state === 'FAILED'){
        this.missionData.infections.push(infection);
      }
    }
  }
}
