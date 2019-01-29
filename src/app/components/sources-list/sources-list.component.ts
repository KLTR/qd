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
  missionDataFlattened: any;
  events: any[];
  filteredSources = [];
  filterValue = '';
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
    this.missionDataFlattened = [];
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
       this.assignFilteredSources();
      })
    this.http.getEvents().subscribe(res => {
      this.events = res;
    })

  }
  assignFilteredSources() {
    this.filteredSources =  this.missionData.sources;
    this.setFilter(this.filterValue);
  }
  setFilter(value){
    this.filterValue = value;
    if(!value || value === '') {
      this.filteredSources = this.missionData.sources;
    } else {
     this.filteredSources = this.missionData.sources.filter(item => item.status === value)
 
    }
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

 isAnimatedIcon(source): boolean {
  switch (source.state) {
    case 'DOWNLOADING_AGENT' :
    case 'INITIALIZING' :
    case 'DOWNLOADING' :
    case 'ACTIVE' :
    case 'TERMINATING' :
    case 'COLLECTING_DATA':
      return true;
    default:
      return false;
  }
}
 setAnimatedIcon(source) {
  switch (source.state) {
    // 0
    case 'DOWNLOADING_AGENT':
    return {
      height: 23,
      width: 25,
      options: {
        path: 'assets/svg-jsons/downloading-agent.json',
        autoplay: true,
        loop: true,
        rendererSettings: {
          progressiveLoad: true,
          preserveAspectRatio: 'xMidYMid meet',
          scaleMode: 'noScale'
        }
      }
    };
    // 1
    case 'INITIALIZING':
    return {
      height: 27,
      width: 27,
      options: {
        path: 'assets/svg-jsons/initializing.json',
        autoplay: true,
        loop: true,
        rendererSettings: {
          progressiveLoad: true,
          preserveAspectRatio: 'xMidYMid meet'
        }
      }
    };
    // 2
    case 'DOWNLOADING':
    return {
      height: 27,
      width: 27,
      options: {
        path: 'assets/svg-jsons/downloading.json',
        autoplay: true,
        loop: true,
        rendererSettings: {
          progressiveLoad: true,
          preserveAspectRatio: 'xMidYMid meet'
        }
      }
    };
    // 3
    case 'ACTIVE':
      return {
        height: 30,
        width: 30,
        options: {
          path: 'assets/svg-jsons/active.json',
          autoplay: true,
          loop: true,
          rendererSettings: {
            progressiveLoad: true,
            preserveAspectRatio: 'xMidYMid meet'
          }
        }
      };
  //4
    case 'TERMINATING':
      return {
        height: 27,
        width: 27,
        options: {
          path: 'assets/svg-jsons/shutting-down.json',
          autoplay: true,
          loop: true,
          rendererSettings: {
            progressiveLoad: true,
            preserveAspectRatio: 'xMidYMid meet'
          }
        }
      };
  }
}
deviceStatusToText(source): string{
  switch(source.state){
    case 'DOWNLOADING_AGENT':
      return 'Downloading agent';
    case 'INITIALIZING' :
      return 'Initiazlizing';
    case 'DOWNLOADING' :
      return 'Downloading';
    case 'ACTIVE' :
      return 'Active'
    case 'TERMINATING' :
      return 'Terminating';
    case 'COLLECTING_DATA':
      return 'Collecting data';
    case 'TERMINATED':
      return 'Terminated';
    case 'LOST_CONNECTION':
      return 'Lost conn.'
  }
}
  catchWebSocketEvents(msg) {
    if(Object.keys(msg)[0] === 'error'){
      return;
    }
    if(msg.result){
      switch(Object.keys(msg.result)[0]) {
        case 'target':
        this.handleTarget(msg.result.target);
        this.missionData = Object.assign({}, this.missionData);
        break;
        case 'infection':
        this.handleInfection(msg.result.infection);
        this.missionData = Object.assign({}, this.missionData);
        break;
        case 'source':
        this.handleSource(msg.result.source);
        this.missionData = Object.assign({}, this.missionData);
        this.assignFilteredSources();
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

  handleTarget(target){
    // let t = this.missionData.targets.find( (t) => t.id === target.id );
    if(!target.state){
      return;
    }
    let targetObj = target.target;
    console.log(target);
    this.missionData.targets = this.missionData.targets.filter((x) => {if(x.target.id !== targetObj.id){return x}});
    this.missionData.targets.push(target);
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
      this.missionData.infections = this.missionData.infections.filter((x) => { if(x.infection.id !== infectionObj.id){ return x}});
      if(infectionObj.state === 'FAILED'){
        this.missionData.infections.push(infection);
      }
    }
  }

  handleSource(source){
    let sourceObj = source.source;
    if(!source.state){
      return;
    }
    this.missionData.sources = this.missionData.sources.filter((x) => {if(x.source.id !== sourceObj.id){return x}});
    this.missionData.sources.push(source)
  }
}
