import { Component, OnInit } from '@angular/core';
import { HttpService, WsService } from '@app/services';
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
  terminatedSourcesNumber: number;
  selectedSource: any;
  isLoading: boolean;
  constructor(private http: HttpService, private ws: WsService) {
    this.ws.messages.subscribe(msg => this.catchWebSocketEvents(msg));
  }

  ngOnInit() {
    this.isLoading = true;
    this.http.getDashboard().subscribe(res => {
      this.isLoading = false;
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
      console.log(this.leftBarData);
    });
    this.http.getEvents().subscribe(res => {
      this.events = res.events;
      if (!this.events) {
        this.events = [];
      }
    });
  }
  filterByTarget(target) {
    this.filterValue = '';
    this.selectedTarget = target;
    this.filteredSources = this.leftBarData.sources.filter(item => item.source.target_id === target.id);
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
      this.filteredSources = this.leftBarData.sources.filter(item => item.state === value);
    }
  }
  filterPendingInfections() {
    this.leftBarData.infections = this.leftBarData.infections.filter(infection => infection.state !== 'PENDING');
  }

  selectSource(source) {
    if (source === this.selectedSource) {
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
        return x;
      }
    });
    // only push if target state is not DELETED
    if (target.state !== 'DELETED') {
      this.leftBarData.targets.unshift(target);
    }
  }

  handleInfection(infection) {
    if (!infection.state) {
      return;
    }
    this.leftBarData.infections = this.leftBarData.infections.filter(inf => {
      if (inf.device_id !== infection.device_id) {
        return inf;
      }
    });
    switch (infection.state) {
      case 'IN_PROGRESS':
      case 'FAILED':
        this.leftBarData.infections.unshift(infection);
        break;
      default:
        return;
    }
  }

  handleSource(source) {
    const sourceObj = source;
    if (!source.state) {
      return;
    }

    this.leftBarData.sources = this.leftBarData.sources.filter(src => {
      if (src.id !== sourceObj.id) {
        return src;
      }
    });
    this.leftBarData.sources.unshift(source);
    this.leftBarData.sources.sort(this.stateComparator);
  }
  ngOnChanges(): void {
    this.setSourcesNumbers();
  }
  setSourcesNumbers() {
    if (!this.leftBarData || !this.leftBarData.sources) {
      return;
    }
    this.allSourcesNumber = this.leftBarData.sources.length;
    this.downloadingSourcesNumber = this.leftBarData.sources.filter(src => src.state === 'DOWNLOADING').length;
    this.acitveSourcesNumber = this.leftBarData.sources.filter(
      src =>
        src.state === 'ACTIVE' ||
        src.state === 'DOWNLOADING' ||
        src.state === 'DOWNLOADING_AGENT' ||
        src.state === 'INITIALIZING' ||
        src.state === 'COLLECTING_DATA'
    ).length;
    this.lostConnectionSourcesNumber = this.leftBarData.sources.filter(src => src.state === 'LOST_CONNECTION').length;
    this.terminatedSourcesNumber = this.leftBarData.sources.filter(src => src.state === 'TERMINATED').length;
  }
  trackFn(index, item) {
    return item.id;
  }

  stateComparator(s1, s2): number {
    function stateToNumber(state): number {
      switch (state) {
        case 'ACTIVE':
          return 1;
        case 'DOWNLOADING':
          return 2;
        case 'DOWNLOADING_AGENT':
          return 3;
        case 'INITIALIZING':
          return 4;
        case 'COLLECTING_DATA':
          return 5;
        default:
          return 6;
      }
    }

    const severityNumber1 = stateToNumber(s1);
    const severityNumber2 = stateToNumber(s2);

    return severityNumber1 - severityNumber2;
  }
}
