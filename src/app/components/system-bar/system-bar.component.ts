import { HttpService } from '@app/services';
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
  aliceStatus: String;
  pioneerStatus: String;
  cloudStatus: String;
  config: any;
  constructor(
    private cdRef: ChangeDetectorRef,
    private http: HttpService) {
    this.isMenuOpen = false;
    this.date = new Date();
    this.layoutInterval = null;
  }

  ngOnInit() {
  this.http.getConfig().subscribe( res => this.config = res)
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    this.getBatteryMode();
    this.getInternetMode();
    this.getDiskSpace();
    this.getDeviceStatus();
    this.getAliceStatus();
    this.getPioneerStatus();
    this.getCloudStatus()
    this.checkInterceptor();
    
  }

  ngAfterViewInit() {
    this.checkInterceptor();
    this.cdRef.detectChanges();
  }

  checkInterceptor() {
    if (this.system.interceptor && this.config) {
      if (this.system.interceptor.indicators.state === this.config.indicators.state.green && this.tooltip) {
        this.tooltip.open();
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
      }
    }
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
      if (this.system.interceptor.indicators.state === this.config.indicators.state.green) {
        this.interceptorStatus = 'interceptor';
      } else {
        this.interceptorStatus = 'interceptor-failed';
      }
    }
  }

  getAliceStatus(){
    if(this.system.alice && this.config){
      if(this.system.alice.indicator.state === this.config.indicators.state.green){
        this.aliceStatus = 'alice-green'
      } else {
        this.aliceStatus = 'alice-no-light'
      }
    }
  }

  getCloudStatus(){
    if(this.system.cloudx && this.config){
      if(this.system.cloudx.indicator.state === this.config.indicators.state.green){
        this.cloudStatus = 'cloud-green'
      } else {
        this.cloudStatus = 'cloud-no-light'
      }
    }
  }

  getPioneerStatus(){
    if(this.system.pioneer && this.config){
        this.pioneerStatus = 'pioneer'
    }
  }
  openInterceptorTooltip() {
    this.tooltip.isOpen() ? this.tooltip.close() : this.tooltip.open();
  }

}
