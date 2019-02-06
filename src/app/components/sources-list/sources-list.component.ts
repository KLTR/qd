import { environment as env } from '@env/environment.prod';
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
  events: any;
  filteredSources = [];
  filterValue = '';
  allSourcesNumber: number;
  downloadingSourcesNumber: number;
  acitveSourcesNumber: number;
  lostConnectionSourcesNumber: number;
  terminatedSourcesNumber: number
  constructor(
    private http: HttpService,
    private ws: WsService,
    ){
      this.ws.messages.subscribe(msg => {
        this.catchWebSocketEvents(msg)
      })
}

  ngOnInit() {
    
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
       this.setSourcesNumbers();
       this.filterPendingInfections();
       this.missionData.sources.forEach(source => {
         this.setSourceInfoStatus(source);
       });
      })
    this.http.getEvents().subscribe(res => {
      this.events = res.events;
    })
    if(!this.events){
      this.events = [];
    }
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
  filterPendingInfections(){
    this.missionData.infections = this.missionData.infections.filter(infection => infection.infection.state !== 'PENDING');
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
      if(env.debug){
        console.log(msg.result);
      }
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
        this.setSourcesNumbers();
        break;
        case 'event':
        this.events.unshift(msg.result.event.log);
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
    console.log(target);
    this.missionData.targets = this.missionData.targets.filter((x) => {if(x.target.id !== target.target.id){return x}});
    this.missionData.targets.unshift(target);
  }

  handleInfection(infection){
    let infectionObj = infection.infection; 
    if(!infectionObj.state || infectionObj.state === 'PENDING'){
      return;
    }

    if(infectionObj.state === 'IN_PROGRESS'){
      this.missionData.infections.unshift(infection);
      return;
    }
     else {
      this.missionData.infections = this.missionData.infections.filter((x) => { if(x.infection.id !== infectionObj.id){ return x}});
      if(infectionObj.state === 'FAILED'){
        this.missionData.infections.unshift(infection);
      }
    }
  }

  handleSource(source){
    let sourceObj = source.source;
    if(!source.state){
      return;
    }

    this.missionData.sources = this.missionData.sources.filter((x) => {if(x.source.id !== sourceObj.id){return x}});
    this.setSourceInfoStatus(source);
    this.missionData.sources.unshift(source)
    
  }

  setSourcesNumbers(){
    if(!this.missionData || !this.missionData.sources){
      return;
    }
    this.allSourcesNumber = this.missionData.sources.length;
    this.downloadingSourcesNumber =  this.missionData.sources.filter((src) => src.state === 'DOWNLOADING').length;
    this.acitveSourcesNumber = this.missionData.sources.filter((src) => src.state === 'ACTIVE').length;
    this.lostConnectionSourcesNumber = this.missionData.sources.filter((src) => src.state === 'LOST_CONNECTION').length;
    this.terminatedSourcesNumber = this.missionData.sources.filter((src) => src.state === 'TERMINATED').length;
  }


  setSourceInfoStatus(source) {
      if(source.state === 'INITIALIZING' || source.state === 'DOWNLOADING_AGENT'){
        source.noInfo = true;
      }
    }
}

