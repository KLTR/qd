import { HttpService } from './../../../services/http/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-source-cube',
  templateUrl: './source-cube.component.html',
  styleUrls: ['./source-cube.component.scss']
})
export class SourceCubeComponent implements OnInit {
@Input() source;
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.setSourceInfoStatus();
    this.setIsanimatedIcon();
  }
  setIsanimatedIcon(): boolean {
    switch (this.source.state) {
      case 'DOWNLOADING_AGENT':
      case 'INITIALIZING':
      case 'DOWNLOADING':
      case 'ACTIVE':
      case 'TERMINATING':
      // case 'COLLECTING_DATA':
        return this.source.isAnimatedIcon = true;
      default:
        return this.source.isAnimatedIcon = false;
    }
  }
  setAnimatedIcon() {
    switch (this.source.state) {
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
          height: 20,
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
  setSourceInfoStatus() {
    if (['INITIALIZING', 'DOWNLOADING_AGENT'].includes(this.source.state)) {
      this.source.noInfo = true;
    }
  }
  exportSource(sourceId) {
    this.http.exportSource(sourceId).subscribe();
  }
}
