import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ConfirmModalComponent } from '@app/components/modals/confirm-modal/confirm-modal.component';
import { ExportModalComponent } from '@app/components/modals/export-modal/export-modal.component';
import { AppConfigService, IconService } from '@app/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from './../../../services/http/http.service';

@Component({
  selector: 'app-source-cube',
  templateUrl: './source-cube.component.html',
  styleUrls: ['./source-cube.component.scss']
})
export class SourceCubeComponent implements OnInit {
  @Input() source;
  timedOut = false;
  isAnimated: boolean;
  profilePicIndex = 0;
  sourceDuration: string;
  ONE_SECOND = 1 * 1000;
  config: any;
  now = new Date();
  imgUrl: string;
  wifiTip: string;
  constructor(
    private http: HttpService,
    private iconService: IconService,
    private modalService: NgbModal,
    private appConfig: AppConfigService
  ) {}

  ngOnInit() {
    this.initSourceCube();
    this.config = this.appConfig.getConfig();
    if (this.source.profile_pics) {
      this.imgUrl = `${this.config.apiUrl}/media/${this.source.profile_pics[this.profilePicIndex].id}`;
    }
  }

  ngOnChanges(changes: SimpleChange) {
    // bad animation rendering
    if (changes['source']) {
      this.initSourceCube();
      if (this.source.state !== 'TERMINATED') {
        setInterval(() => {
          this.now = new Date();
        }, this.ONE_SECOND);
      }
    }
  }

  initSourceCube() {
    this.getWifiStatus();
    this.source.animatedIcon = this.setAnimatedIcon();
    this.isAnimated = this.isAnimatedIcon();
  }

  changeImg(event) {
    event.stopPropagation();
    const maxIndex = this.source.profile_pics.length - 1;
    if (this.profilePicIndex < maxIndex) {
      this.profilePicIndex++;
    } else {
      this.profilePicIndex = 0;
    }
    this.imgUrl = `${this.config.apiUrl}/media/${this.source.profile_pics[this.profilePicIndex].id}`;
  }
  getWifiStatus() {
    if (!this.source.device.wifi) {
      return;
    }
    switch (this.source.device.wifi) {
      case 'HIGH':
        this.wifiTip = 'High Signal';
        return 'wifi-excellent';
      case 'MID':
        this.wifiTip = 'Good Signal';
        return 'wifi-mid';
      case 'LOW':
        this.wifiTip = 'Poor Signal';
        return 'wifi-low';
      case 'NOT_AVAILABlE':
        this.wifiTip = 'No Signal';
        return 'no-wifi';
    }
  }

  getBatteryStatus() {
    if (!this.source.device.battery) {
      return;
    }
    if (this.source.device.battery > 20) {
      return 'device-battery-high';
    } else {
      return 'device-battery-low';
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
        setTimeout(() => (this.timedOut = false), 10);
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
        return 'Active';
      case 'TERMINATING':
        return 'Terminating';
      case 'TOOL_IS_COLLECTING_DATA':
        return 'Collecting data';
      case 'TERMINATED':
        return 'Terminated';
      case 'LOST_CONNECTION':
        return 'Lost conn.';
    }
  }
  isNoInfo() {
    return ['INITIALIZING', 'DOWNLOADING_AGENT'].includes(this.source.state);
  }
  exportSource(event, sourceId) {
    event.stopPropagation();
    const exportModal = this.modalService.open(ExportModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
      windowClass: 'max-fit'
    });
    exportModal.componentInstance.dataType = 'Source';
    exportModal.componentInstance.data = this.source;
  }
  terminateAgent(event, sourceId) {
    event.stopPropagation();
    if (['TERMINATING', 'TERMINATED'].includes(this.source.state)) {
      return;
    }
    const confirmModal = this.modalService.open(ConfirmModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static'
    });
    confirmModal.componentInstance.title = 'Terminate agent';
    confirmModal.componentInstance.message = `Are you sure you want to terminate '${this.source.name}'?`;
    confirmModal.result.then(res => {
      if (res) {
        this.http.terminateAgent(sourceId).subscribe(
          result => {
            console.log(result);
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }
}
