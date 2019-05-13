import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  id: string;
  private sub: any;
  constructor(private http: HttpService, private ws: WsService, private router: Router, private route: ActivatedRoute) {
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
    this.http.getRightBar().subscribe(res => {
      this.events = res.events;
      if (!this.events) {
        this.events = [];
      }
    });
    // if (!this.selectedSource) {
    //   this.route.firstChild.params.subscribe(params => {
    //     console.log(params['id']);
    //     this.http.getSource(params['id']).subscribe(res => {
    //       console.log(res), (this.selectedSource = res);
    //     });
    //   });
    // }
  }

  filterByTarget(target) {
    this.filterValue = '';
    this.selectedTarget = target;
    this.filteredSources = this.leftBarData.sources.filter(source => source.target_id === target.id);
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
    } else if (value === 'ACTIVE' || value === 'IDLE') {
      this.filteredSources = this.leftBarData.sources.filter(
        item =>
          item.state === 'IDLE' ||
          item.state === 'ACTIVE' ||
          item.state === 'DOWNLOADING' ||
          item.state === 'DOWNLOADING_AGENT' ||
          item.state === 'INITIALIZING' ||
          item.state === 'COLLECTING_DATA'
      );
    } else {
      this.filteredSources = this.leftBarData.sources.filter(source => source.state === value);
    }
  }
  filterPendingInfections() {
    this.leftBarData.infections = this.leftBarData.infections.filter(infection => infection.state !== 'PENDING');
  }

  selectSource(source) {
    console.log(source);
    if (source === this.selectedSource) {
      this.selectedSource = null;
      this.router.navigate(['/dashboard']);
    } else {
      this.selectedSource = source;
      this.router.navigate(['/dashboard/source-info', source.id]);
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
        case 'new_event':
          console.log(msg.result);
          this.events.unshift(msg.result.new_event);
          this.events = this.events.slice();
          break;
      }
    } else {
      console.log('err', msg.result);
    }
  }

  handleTarget(target) {
    // filters new target from array
    this.leftBarData.targets = this.leftBarData.targets.filter(t => {
      if (t.id !== target.id) {
        return t;
      }
    });
    // only push if target state is not DELETED
    if (!target.archived) {
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
        src.state === 'IDLE' ||
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
