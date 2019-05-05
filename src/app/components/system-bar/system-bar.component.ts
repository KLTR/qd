import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '@app/services';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { interval, Observable } from 'rxjs/';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-system-bar',
  templateUrl: './system-bar.component.html',
  styleUrls: ['./system-bar.component.scss']
})
export class SystemBarComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() system: any;
  @ViewChild('t') public tooltip: NgbTooltip;

  // Popovers childs
  @ViewChild('internetPop') public internetPop: any;
  @ViewChild('alicePop') public alicePop: any;
  @ViewChild('cloudPop') public cloudPop: any;
  // @ViewChild('pioneerPop') public pioneerPop: any;
  @ViewChild('interceptorPop') public interceptorPop: any;
  openedPop: any;
  pops: any[];
  isMenuOpen: boolean;
  date: any;
  clock$: Observable<number>;
  layoutInterval: any;
  batteryStatus: string;
  internetStatus: string;
  diskStatus: string;
  interceptorStatus: string;
  aliceStatus: string;
  pioneerStatus: string;
  cloudStatus: string;
  showInternetTip = false;
  config: any;
  selectedInterceptor: any;
  jsonInterceptor: any;
  constructor(private cdRef: ChangeDetectorRef, private modalService: NgbModal, private http: HttpService) {
    this.isMenuOpen = false;
    this.date = new Date();
    this.layoutInterval = null;
  }

  ngOnInit() {
    this.clock$ = interval(1000).pipe(map(() => Date.now()));
    this.http.getConfigLocal().subscribe(res => (this.config = res));
    this.pops = [this.alicePop, this.cloudPop, this.interceptorPop];
  }

  ngOnChanges() {
    this.getDeviceStatus();
    this.getAliceStatus();
    this.getCloudStatus();
    this.checkInterceptor();
  }

  ngAfterViewInit() {
    this.checkInterceptor();
    this.cdRef.detectChanges();
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
    for (let i = 0; i < this.pops.length; i++) {
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
    if (this.selectedInterceptor) {
      return;
    }
    if (this.system.interceptor && this.config) {
      if (this.system.interceptor.interceptors && this.system.interceptor.interceptors.length > 0) {
        this.system.interceptor.interceptors.forEach(element => {
          if (element.connected) {
            this.selectedInterceptor = element;
            return;
          }
        });
        if (!this.selectedInterceptor) {
          this.selectedInterceptor = this.system.interceptor.interceptors[0];
        }
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
        this.aliceStatus = 'alice-green';
      } else {
        this.aliceStatus = 'alice-red';
      }
    }
  }

  getCloudStatus() {
    if (this.system.cloudx && this.config) {
      if (this.system.cloudx.indicator.state === this.config.indicators.state.green) {
        this.cloudStatus = 'cloud-green';
      } else {
        this.cloudStatus = 'cloud-red';
      }
    }
  }

  selectInterceptor(interceptor: Object) {
    this.selectedInterceptor = interceptor;
  }
}
