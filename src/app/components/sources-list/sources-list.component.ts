
import {
  HttpService,
  WsService
} from '@app/services';
import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-sources-list',
  templateUrl: './sources-list.component.html',
  styleUrls: ['./sources-list.component.scss']
})
export class SourcesListComponent implements OnInit {

  leftBarData: any;
  events: any;
  filteredSources = [];
  filterValue = 'ALL';
  selectedTarget: any;
  allSourcesNumber: number;
  downloadingSourcesNumber: number;
  acitveSourcesNumber: number;
  lostConnectionSourcesNumber: number;
  terminatedSourcesNumber: number
  isImagesShown: boolean;
  selectedSource: any;
  constructor(private http: HttpService, private ws: WsService, ) {
    this.ws.messages.subscribe(msg => this.catchWebSocketEvents(msg))
  }

  ngOnInit() {
    this.isImagesShown = true;
    this.http.getDashboard().subscribe(res => {
      this.leftBarData = res;

      if (!this.leftBarData.sources) {
        this.leftBarData.sources = [];
      }
      if (!this.leftBarData.targets) {
        this.leftBarData.targets = [];
      }
      if (!this.leftBarData.infections) {
        this.leftBarData.infections = [];
      }
      this.assignFilteredSources();
      this.setSourcesNumbers();
      this.filterPendingInfections();

    })
    this.http.getEvents().subscribe(res => {
      this.events = res.events;
        if (!this.events) {
         this.events = [];
      }
    })
  
  }
  filterByTarget(target){
    this.filterValue = '';
    this.selectedTarget = target;
    this.filteredSources = this.leftBarData.sources.filter(item => item.source.target_ids[0] === target.id)
  }
  assignFilteredSources() {
    this.filteredSources = this.leftBarData.sources;
    this.setFilter(this.filterValue);
  }
  setFilter(value) {
    this.selectedTarget = null;
    this.filterValue = value;
    if (!value || value === 'ALL') {
      this.filteredSources = this.leftBarData.sources;
    } else {
      this.filteredSources = this.leftBarData.sources.filter(item => item.state === value)

    }
  }
  filterPendingInfections() {
    this.leftBarData.infections = this.leftBarData.infections.filter(infection => infection.state !== 'PENDING');
  }


  toggleImg() {
    this.isImagesShown = !this.isImagesShown;
  }
selectSource(source){
  if(source === this.selectedSource){
    this.selectedSource = null;
    
  } else {
    this.selectedSource = source;
  }
}

  catchWebSocketEvents(msg) {
    if (Object.keys(msg)[0] === 'error') {
      return;
    }
    if (msg.result) {
      switch (Object.keys(msg.result)[0]) {
        case 'target':
          this.handleTarget(msg.result.target);
          this.leftBarData = Object.assign({}, this.leftBarData);
          break;
        case 'infection':
          this.handleInfection(msg.result.infection);
          this.leftBarData = Object.assign({}, this.leftBarData);
          break;
        case 'source':
          this.handleSource(msg.result.source);
          this.leftBarData = Object.assign({}, this.leftBarData);
          this.assignFilteredSources();
          this.setSourcesNumbers();
          break;
        case 'event':
          this.events.unshift(msg.result.event);
          this.events = this.events.slice();
          break;
      }
    } else {
      console.log('err', msg.result);
    }
  }

  handleTarget(target) {
     // filters new target from array
     this.leftBarData.targets = this.leftBarData.targets.filter(x => {
      if (x.target.id !== target.target.id) {
        return x
      }
    });
    // only push if target state is not DELETED
    if(target.state !== 'DELETED'){
      this.leftBarData.targets.unshift(target);
    }
  }

  handleInfection(infection) {
    let infectionObj = infection;
    if (!infectionObj.state || infectionObj.state === 'PENDING') {
      return;
    }

    if (infectionObj.state === 'IN_PROGRESS') {
      this.leftBarData.infections.unshift(infection);
      return;
    } else {
      this.leftBarData.infections = this.leftBarData.infections.filter((inf) => {
        if (inf.id !== infectionObj.id) {
          return inf
        }
      });
      if (infectionObj.state === 'FAILED') {
        this.leftBarData.infections.unshift(infection);
      }
    }
  }

  handleSource(source) {
    let sourceObj = source;
    if (!source.state) {
      return;
    }

    this.leftBarData.sources = this.leftBarData.sources.filter((src) => {
      if (src.id !== sourceObj.id) {
        return src
      }
    });
    this.leftBarData.sources.unshift(source)

  }
ngOnChanges(): void {
  this.setSourcesNumbers()
}
  setSourcesNumbers() {
    if (!this.leftBarData || !this.leftBarData.sources) {
      return;
    }
    this.allSourcesNumber = this.leftBarData.sources.length;
    this.downloadingSourcesNumber = this.leftBarData.sources.filter((src) => src.state === 'DOWNLOADING').length;
    this.acitveSourcesNumber = this.leftBarData.sources.filter((src) => src.state === 'ACTIVE').length;
    this.lostConnectionSourcesNumber = this.leftBarData.sources.filter((src) => src.state === 'LOST_CONNECTION').length;
    this.terminatedSourcesNumber = this.leftBarData.sources.filter((src) => src.state === 'TERMINATED').length;
  }
  trackFn(index, item) {
    return item.id;
  }
}
