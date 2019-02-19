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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportModalComponent } from '@app/components/modals/export-modal/export-modal.component';
import {FileSizePipe} from '@app/pipes/fileSize.pipe'
@Component({
  selector: 'app-source-cube',
  templateUrl: './source-cube.component.html',
  styleUrls: ['./source-cube.component.scss']
})
export class SourceCubeComponent implements OnInit {
  @Input() source;
  @Input() showImages;
  timedOut = false;
  isAnimated: boolean;
  profilePicIndex = 0;
  sourceDuration: string;
  ONE_MINUTE = 60 * 1000;
  now = new Date();
  constructor(
    private http: HttpService,
    private iconService: IconService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
   this.initSourceCube();
   // this updates the duration of source through the amDifference pipe
   setInterval(() => { this.now = new Date() }, this.ONE_MINUTE);
  }

  ngOnChanges(){
    this.initSourceCube();
  }

  initSourceCube() {
    this.source.animatedIcon = this.setAnimatedIcon();
    this.isAnimated = this.isAnimatedIcon();
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
        return 'wifi-excellent';
      case 'MID':
        return 'wifi-mid';
      case 'LOW':
        return 'wifi-low';
      case 'NOT_AVAILABE':
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
    if (this.source.animatedIcon) {
      if (!this.source.animatedIcon.options.path.includes(this.source.state)) {
        this.timedOut = true;
        setTimeout(() => this.timedOut = false, 10);
      }
    }
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
  exportSource(sourceId, sourceName) {
    this.http.exportSource(sourceId).subscribe(res => {
    const exportModal =   this.modalService.open(ExportModalComponent,{
        size: 'sm',
        centered: true,
        backdrop: 'static'
      });
      exportModal.componentInstance.dataType = 'Source';
      exportModal.componentInstance.data = this.source.source;
    });
  }
  terminateAgent(sourceId) {
    this.http.terminateAgent(sourceId).subscribe();
  }
}
