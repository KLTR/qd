import { AddTargetWizardComponent } from './../add-target-wizard/add-target-wizard.component';
import { HttpService } from '@app/services/http/http.service';
import { Component, OnInit, Input, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { IconService } from '@app/services/svg-json-icons/svg-icons.service'
import { SatPopover } from '@ncstate/sat-popover';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({

  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {
 @Input() missionData: any;
  temp: any;
  isWizardOpen = false;
  selectedSource: any;
  hoveredInfection: any;
  @ViewChildren('sourcePopovers') public srcPopovers: QueryList<SatPopover>;
  @ViewChildren('infectionPopovers') public infPopovers: QueryList<SatPopover>;
  constructor(
    private http: HttpService,
    public iconService: IconService,
    private _cd: ChangeDetectorRef,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  
  }
ngAfterViewChecked(): void {
  this._cd.detectChanges();
}

getSourcePopover(index): SatPopover{
  return this.srcPopovers.find((p, i) => i === index);
}
getInfectionPopover(index): SatPopover{
  return this.infPopovers.find((p, i) => i === index);
}

 isAnimatedIcon(source) {
  switch (source.state) {
    case 'DOWNLOADING_AGENT' :
    case 'INITIALIZING' :
    case 'DOWNLOADING' :
    case 'ACTIVE' :
    case 'TERMINATING' :
    case 'COLLECTING_DATA':
      return true;
    default:
      return false;
  }
}


setInfectionIcon(state){
  switch(state){
    case "IN_PROGRESS":
    return 'infection-attacking'
    case "FAILED":
    return 'infection-failed'
}
  }

  closeT(index) {
    let pop =   this.srcPopovers.find((p, i) => i === index);
    pop.close();
    this.selectedSource = null;
  }

  selectSource(source){
    this.selectedSource = source;
   }

   selectHoveredInfection(infection){
     this.hoveredInfection = infection;
   }
// 
   setAnimatedIcon(source) {
 
    switch (source.state) {
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
        height: 27,
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
          height: 27,
          width: 27,
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
    // 4
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

 openWizard(){
   this.isWizardOpen = true;
   this.openAddAttack();
 }

 closeWizard(){
    this.isWizardOpen = false;
 }

 openAddAttack() {
  const openAddAttackModal = this.modalService.open(AddTargetWizardComponent, {
    windowClass: 'add-attack-modal',
    centered: true,
    backdrop: 'static'
  });
}
}
