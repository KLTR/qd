import {
  HttpService
} from './../../../services/http/http.service';
import {
  Component,
  OnInit,
  Input,
  SimpleChange,
} from '@angular/core';
import {
  IconService
} from '@app/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportModalComponent } from '@app/components/modals/export-modal/export-modal.component';
import {AppConfigService} from "@app/services";

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
  ONE_SECOND = 1 * 1000;

  now = new Date();
  constructor(
    private http: HttpService,
    private iconService: IconService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
   this.initSourceCube();
   // this updates the duration of source through the amDifference pipe
  }

  ngOnChanges(changes: SimpleChange){
    // only init cube when changes is in source and not on showImages - this cause
    // bad animation rendering
    if(changes['source']){
      this.initSourceCube();
      if(this.source.state !== 'TERMINATED'){
        setInterval(() => { this.now = new Date() }, this.ONE_SECOND);
      }
    }
  }

  initSourceCube() {
    this.source.animatedIcon = this.setAnimatedIcon();
    this.isAnimated = this.isAnimatedIcon();
  }



  changeImg(event){
    event.stopPropagation()
    let maxIndex = this.source.profile_pics.length - 1;
    if(this.profilePicIndex < maxIndex){
      this.profilePicIndex++;
    } else {
      this.profilePicIndex = 0;
    }
  }
  getWifiStatus() {
    if(!this.source.device.wifi){
      return;
    }
    switch (this.source.device.wifi) {
      case "HIGH":
        return 'wifi-excellent';
      case 'MID':
        return 'wifi-mid';
      case 'LOW':
        return 'wifi-low';
      case 'NOT_AVAILABlE':
        return 'no-wifi';

    }
  }
  getBatteryStatus(){
    if(!this.source.device.battery){
      return;
    }
    if(this.source.device.battery > 20){
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
      case 'IDLE':
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
      case 'SERVER_IS_PROCESSING_DATA':  
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
      case 'IDLE':
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
      case 'SERVER_IS_PROCESSING_DATA':
        return 'Processing';
      case 'IDLE':
        return 'Active'
      case 'TERMINATING':
        return 'Terminating';
      case 'TOOL_IS_COLLECTING_DATA':
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
    this.http.exportSource(sourceId).subscribe(res => {
    const exportModal =   this.modalService.open(ExportModalComponent,{
        size: 'sm',
        centered: true,
        backdrop: 'static'
      });
      exportModal.componentInstance.dataType = 'Source';
      exportModal.componentInstance.data = this.source;
    });
  }
  terminateAgent(sourceId) {
    this.http.terminateAgent(sourceId).subscribe();
  }
}
