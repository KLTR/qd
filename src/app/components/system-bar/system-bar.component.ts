import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild, SimpleChange } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { SystemInfo, User } from '@app/models';
import { Observable, interval} from 'rxjs/';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-system-bar',
  templateUrl: './system-bar.component.html',
  styleUrls: ['./system-bar.component.scss']
})
export class SystemBarComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() user: User;
  @Input() system: SystemInfo;
  @ViewChild('t') public tooltip: NgbTooltip;
  isMenuOpen: boolean;
  date: any;
  clock$: Observable<number> = interval(1000).pipe(
    map(() => Date.now())
  );
  layoutInterval: any;
  batteryStatus: String;
  internetStatus: String;
  diskStatus: String;
  interceptorStatus: String;

  constructor(private cdRef: ChangeDetectorRef) {
    this.isMenuOpen = false;
    this.date = new Date();
    this.layoutInterval = null;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    this.getBatteryMode();
    this.getInternetMode();
    this.getDiskSpace();
    this.getDeviceStatus();
    this.checkInterceptor();
    console.log(this.internetStatus);
  }

  ngAfterViewInit() {
    this.checkInterceptor();
    this.cdRef.detectChanges();
  }

  checkInterceptor() {
    if (this.system.interceptor) {
      if (this.system.interceptor.indicators.state === "GREEN" && this.tooltip) {
        this.tooltip.open();
      }
    }
  }

  getBatteryMode() {
    if (this.system.goat) {
      switch (this.system.goat.indicator.state) {
        case "GREEN":
          this.batteryStatus = 'battery-full';
          break;
        case "YELLOW":
          this.batteryStatus = 'battery-mid';
          break;
        case "RED":
          this.batteryStatus = 'battery-low';
          break;
        // default :
        // Chargin icon
        //   this.batteryStatus = 'power-on';
        //   break;
      }
    }
  }

  getDiskSpace() {
    if (this.system.storage) {
      switch (this.system.storage.indicator.state) {
        case "GREEN":
          this.diskStatus = 'storage-full';
          break;
        case "YELLOW":
          this.diskStatus = 'storage-half';
          break;
        case "RED":
          this.diskStatus = 'storage-empty';
          break;
      }
    }
  }

  getInternetMode() {
    if (this.system.internet) {
      if (this.system.internet.indicator.state === "GREEN") {
        this.internetStatus = 'connected';
      } else {
        this.internetStatus = 'not-connected';
      }
    }
  }

  getDeviceStatus() {
    if (this.system.interceptor) {
      if (this.system.interceptor.indicators.state === "GREEN") {
        this.interceptorStatus = 'interceptor';
      } else {
        this.interceptorStatus = 'interceptor-failed';
      }
    }
  }

  openInterceptorTooltip() {
    this.tooltip.isOpen() ? this.tooltip.close() : this.tooltip.open();
  }

}
