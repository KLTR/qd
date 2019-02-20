import {
  AddTargetWizardComponent
} from './../modals/add-target-wizard/add-target-wizard.component';
import {
  HttpService
} from '@app/services/http/http.service';
import {
  Component,
  OnInit,
  Input,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import {
  IconService
} from '@app/services/svg-json-icons/svg-icons.service'
import {
  SatPopover
} from '@ncstate/sat-popover';
import {
  NgbModal,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import {
  DeviceListModalComponent
} from '../modals/device-list-modal/device-list-modal.component';
@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {
  @Input() leftBarData: any;
  @Output() filterByTarget: EventEmitter<any> = new EventEmitter();
  temp: any;
  isWizardOpen = false;
  selectedSource: any;
  hoveredInfection: any;
  sources: any[]

  @ViewChildren('sourcePopovers') public srcPopovers: QueryList < SatPopover > ;
  @ViewChildren('infectionPopovers') public infPopovers: QueryList < SatPopover > ;
  constructor(
    private http: HttpService,
    private iconService: IconService,
    private _cd: ChangeDetectorRef,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.sources = [];
    this.filterSources();
  }
ngOnChanges(): void {
  this.filterSources()
}
  ngAfterViewChecked(): void {
    this._cd.detectChanges();
  }

  filterTargetSources(target){
    this.filterByTarget.emit(target);
  }

  getSourcePopover(index): SatPopover {

    return this.srcPopovers.find((p, i) => i === index);
  }
  getInfectionPopover(index): SatPopover {
    return this.infPopovers.find((p, i) => i === index);
  }

  filterSources(){
    if(this.leftBarData){
      this.sources = this.leftBarData.sources.filter( source => source.state !== 'TERMINATED')
    }
  }

  setInfectionIcon(state) {
    switch (state) {
      case "IN_PROGRESS":
        return 'infection-attacking'
      case "FAILED":
        return 'infection-failed'
    }
  }

  closeT(index) {
    let pop = this.srcPopovers.find((p, i) => i === index);
    pop.close();
    this.selectedSource = null;
  }

  selectSource(source, index) {
    this.selectedSource = source;
    this.selectedSource.index = index;
  }

  selectHoveredInfection(infection) {
    this.hoveredInfection = infection;
  }
  // 
  isAnimatedIcon(source) {
    switch (source.state) {
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

  openWizard() {
    this.isWizardOpen = true;
    this.openAddAttack();
  }

  closeWizard() {
    this.isWizardOpen = false;
  }

  openAddAttack() {
    let AddTargetModalRef = this.modalService.open(AddTargetWizardComponent, {
      windowClass: 'add-attack-modal',
      centered: true,
      backdrop: 'static'
    });
    // this.AddTargetModalRef.componentInstance._cd.detectChanges();
  }
  openDeviceListModal(targetId) {
    this.http.findPioneerDevices(targetId).subscribe(res => {
      console.log(res);
      let deviceListModalRef = this.modalService.open(DeviceListModalComponent, {
        centered: true,
        size: 'lg',
        backdrop: 'static'
      });
      deviceListModalRef.componentInstance.deviceList = res.devices;
      deviceListModalRef.componentInstance.targetId = res.target.id;
      deviceListModalRef.componentInstance.target = res.target;

    })
  }
}
