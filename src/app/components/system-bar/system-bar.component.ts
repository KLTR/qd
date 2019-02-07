import {
  HttpService
}
from '@app/services';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  SimpleChange
}
from '@angular/core';
import {
  NgbTooltip
}
from '@ng-bootstrap/ng-bootstrap';
import {
  User
}
from '@app/models';
import {
  Observable,
  interval
}
from 'rxjs/';
import {
  map
}

from 'rxjs/operators';

@Component({
      selector: 'app-system-bar',
      templateUrl: './system-bar.component.html',
      styleUrls: ['./system-bar.component.scss']
    }

  ) export class SystemBarComponent implements OnInit,
  OnChanges,
  AfterViewInit {

    @Input() user: User;
    @Input() system: any;
    @ViewChild('t') public tooltip: NgbTooltip;

    // Popovers childs
    @ViewChild('internetPop') public internetPop: any;
    @ViewChild('alicePop') public alicePop: any;
    @ViewChild('cloudPop') public cloudPop: any;
    @ViewChild('pioneerPop') public pioneerPop: any;
    @ViewChild('interceptorPop') public interceptorPop: any;
    openedPop: any;
    pops: any[];
    isMenuOpen: boolean;
    date: any;
    isAlertsOpen = false;
    clock$: Observable < number >= interval(1000).pipe(map(() => Date.now()));
    layoutInterval: any;
    batteryStatus: String;
    internetStatus: String;
    diskStatus: String;
    interceptorStatus: String;
    aliceStatus: String;
    pioneerStatus: String;
    cloudStatus: String;
    showInternetTip = false;
    config: any;
    selectedInterceptor: any;
    jsonInterceptor: any;
    constructor(private cdRef: ChangeDetectorRef,
      private http: HttpService) {
      this.isMenuOpen = false;
      this.date = new Date();
      this.layoutInterval = null;
    }

    ngOnInit() {

      this.http.getConfigLocal().subscribe(res => this.config = res);
      this.pops = [this.internetPop,
        this.alicePop,
        this.cloudPop,
        this.pioneerPop,
        this.interceptorPop
      ];

    }

    ngOnChanges(changes: {
        [key: string]: SimpleChange
      }

    ) {
      this.getBatteryMode();
      this.getInternetMode();
      this.getDiskSpace();
      this.getDeviceStatus();
      this.getAliceStatus();
      this.getPioneerStatus();
      this.getCloudStatus();
      this.checkInterceptor();
    }

    ngAfterViewInit() {
      this.checkInterceptor();
      this.cdRef.detectChanges();
    }

    toggleAlerts() {
      this.isAlertsOpen = !this.isAlertsOpen;
    }

    // Close other popover that is currently open;
    handlePops(index) {

      // If click on opened pop
      if (this.openedPop === this.pops[index]) {
        this.openedPop.close();
        this.openedPop = null;
        return;
      }

      this.openedPop = this.pops[index];
      this.openedPop.open();
      for (let i = 0; i < this.pops.length;

        i++) {
        if (i !== index && this.pops[i].isOpen()) {
          this.pops[i].close();
          return;
        }
      }
    }

    closeTip() {
      this.openedPop.close();
      this.openedPop = null;
    }

    checkInterceptor() {
      if (this.system.interceptor && this.config) {
        if (this.system.interceptor.interceptors && this.system.interceptor.interceptors.length > 0) {
          this.selectedInterceptor = this.system.interceptor.interceptors[0];
        }
      }
    }

    getBatteryMode() {
      if (this.system.goat && this.config) {
        switch (this.system.goat.indicator.state) {
          case this.config.indicators.state.green:
            this.batteryStatus = 'battery-full';
            break;
          case this.config.indicators.state.yellow:
            this.batteryStatus = 'battery-mid';
            break;
          case this.config.indicators.red:
            this.batteryStatus = 'battery-low';
            break;
          default:
            this.batteryStatus = 'battery-low';
            // default :
            // Chargin icon
            //   this.batteryStatus = 'power-on';
            //   break;
        }
      }
    }

    getDiskSpace() {
      if (this.system.storage && this.config) {
        switch (this.system.storage.indicator.state) {
          case this.config.indicators.state.green:
            this.diskStatus = 'storage-full';
            break;
          case this.config.indicators.state.yellow:
            this.diskStatus = 'storage-half';
            break;
          case this.config.indicators.red:
            this.diskStatus = 'storage-empty';
            break;
          default:
            this.diskStatus = 'storage-empty';
        }
      }
    }

    toggleInternetTip(event) {
      this.showInternetTip = !this.showInternetTip;
    }

    getInternetMode() {
      if (this.system.internet && this.config) {
        if (this.system.internet.indicator.state === this.config.indicators.state.green) {
          this.internetStatus = 'connected';
        } else {
          this.internetStatus = 'not-connected';
        }

      }
    }

    getDeviceStatus() {
      if (this.system.interceptor && this.config) {
        if (this.system.interceptor.indicator.state === this.config.indicators.state.green) {
          this.interceptorStatus = 'interceptor';
        } else {
          this.interceptorStatus = 'interceptor-failed';
        }
      }
    }

    getAliceStatus() {
      if (this.system.alice && this.config) {
        if (this.system.alice.indicator.state === this.config.indicators.state.green) {
          this.aliceStatus = 'alice-green'
        } else {
          this.aliceStatus = 'alice-red'
        }
      }
    }

    getCloudStatus() {
      if (this.system.cloudx && this.config) {
        if (this.system.cloudx.indicator.state === this.config.indicators.state.green) {
          this.cloudStatus = 'cloud-green'
        } else {
          this.cloudStatus = 'cloud-red'
        }
      }
    }

    getPioneerStatus() {
      if (this.system.pioneer && this.config) {
        if (this.system.pioneer.indicator.state === this.config.indicators.state.green) {
          this.pioneerStatus = 'pioneer-green';
        } else {
          this.pioneerStatus = 'pioneer-red'
        }
      }
    }

    selectInterceptor(interceptor) {
      this.selectedInterceptor = interceptor;
    }

  }
