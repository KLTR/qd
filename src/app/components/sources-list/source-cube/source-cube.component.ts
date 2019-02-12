import { HttpService } from './../../../services/http/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { IconService } from '@app/services';

@Component({
  selector: 'app-source-cube',
  templateUrl: './source-cube.component.html',
  styleUrls: ['./source-cube.component.scss']
})
export class SourceCubeComponent implements OnInit {
@Input() source;
  constructor(
    private http: HttpService,
    private iconService: IconService) { }

  ngOnInit() {
 
  }

  isAnimatedIcon() {
    switch (this.source.state) {
      case 'DOWNLOADING_AGENT':
      case 'INITIALIZING':
      case 'DOWNLOADING':
      case 'ACTIVE':
      case 'TERMINATING':
     return true
      default:
         return false;
    }
  }

  deviceStatusToText(): string {
    switch (this.source.state) {
      case 'DOWNLOADING_AGENT':
        return 'Downloading agent';
      case 'INITIALIZING':
        return 'Initiazlizing';
      case 'DOWNLOADING':
        return 'Downloading';
      case 'ACTIVE':
        return 'Active'
      case 'TERMINATING':
        return 'Terminating';
      case 'COLLECTING_DATA':
        return 'Collecting data';
      case 'TERMINATED':
        return 'Terminated';
      case 'LOST_CONNECTION':
        return 'Lost conn.'
    }
  }
  isNoInfo() {
    return (['INITIALIZING', 'DOWNLOADING_AGENT'].includes(this.source.state))
  }
  exportSource(sourceId) {
    this.http.exportSource(sourceId).subscribe();
  }
  terminateAgent(sourceId){
    this.http.terminateAgent(sourceId).subscribe();
  }
}
