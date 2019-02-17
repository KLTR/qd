import {
  HttpService
} from './../../../services/http/http.service';
import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  IconService
} from '@app/services';

@Component({
  selector: 'app-source-cube',
  templateUrl: './source-cube.component.html',
  styleUrls: ['./source-cube.component.scss']
})
export class SourceCubeComponent implements OnInit {
  @Input() source;
  profilePicIndex = 0;
  constructor(
    private http: HttpService,
    private iconService: IconService) {}

  ngOnInit() {
    // this.source.animatedIcon = this.setAnimatedIcon();
  }
  changeImg(){
    let maxIndex = this.source.source.device.ios.profile_pics.length - 1;
    if(this.profilePicIndex < maxIndex){
      this.profilePicIndex++;
    } else {
      this.profilePicIndex = 0;
    }
  }
  getWifiStatus() {
    if(!this.source.source.device.ios.indicators.wifi_signal){
      return;
    }
    switch (this.source.source.device.ios.indicators.wifi_signal) {
      case "HIGH":
        // this.device.indicators.wifiTooltip = 'Excellent';
        return 'wifi-excellent';
      case 'MID':
        // this.device.indicators.wifiTooltip = 'Good';
        return 'wifi-mid';
      case 'LOW':
        // this.device.indicators.wifiTooltip = 'Bad';
        return 'wifi-low';
      case 'NOT_AVAILABE':
        // this.device.indicators.wifiTooltip = 'Communication lost with device';
        return 'no-wifi';

    }
  }
  getBatteryStatus(){
    if(!this.source.source.device.ios.indicators.battery){
      return;
    }
    if(this.source.source.device.ios.indicators.battery > 20){
      return 'device-battery-high'
    } else {
      return 'device-battery-low'
    }
  }
  isAnimatedIcon() {
    switch (this.source.state) {
      case 'DOWNLOADING_AGENT':
      case 'INITIALIZING':
      case 'DOWNLOADING':
      case 'ACTIVE':
      case 'TERMINATING':
      // case 'COLLECTING_DATA':
        return true;
      default:
        return false;
    }
  }
  setAnimatedIcon() {
    switch (this.source.state) {
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
      case 'INITIALIZING':
        return {
          height: 23,
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
      case 'DOWNLOADING':
        return {
          height: 23,
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
      case 'ACTIVE':
        return {
          height: 27,
          width: 23,
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
  isNoInfo() {
    return (['INITIALIZING', 'DOWNLOADING_AGENT'].includes(this.source.state))
  }
  exportSource(sourceId) {
    this.http.exportSource(sourceId).subscribe();
  }
  terminateAgent(sourceId) {
    this.http.terminateAgent(sourceId).subscribe();
  }
}
