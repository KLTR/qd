import { HttpService } from '@app/services/http/http.service';
import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { IconService } from '@app/services/svg-json-icons/svg-icons.service'
@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {
  @ViewChild('sourcePop') public sourcePop: any;
 @Input() missionData: any;
  temp: any;
  isWizardOpen = false;
  selectedSource: any;
  constructor(
    private http: HttpService,
    public iconService: IconService
  ) { }

  ngOnInit() {
  }

 ngOnChanges(changes: SimpleChanges): void {
   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
   //Add '${implements OnChanges}' to the class.
 }
 isAnimatedIcon(sourceStatus) {
  switch (sourceStatus) {
    case 'active' :
    case 'initializing' :
    case 'downloading' :
    case 'downloading-agent' :
    case 'shutting-down' :
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
  closeT() {
    console.log(this.sourcePop.isOpen());
    this.sourcePop.close();
    this.selectedSource = null;
  }
  selectSource(source){
    this.selectedSource = source;
   }

  setAnimatedIcon() {
    return {
      height: 18,
      width: 18,
      options: {
        path: 'assets/svg-jsons/initializing.json',
        autoplay: true,
        loop: true,
        rendererSettings: {
          progressiveLoad: true,
          preserveAspectRatio: 'xMidYMid meet',
      }
    }
  }
}

// setIcon(source) {
//   this.isAnimated = this.isAnimatedIcon();
//   if (this.icon.options) {
//     if (!this.icon.options.path.includes(this.source.status)) {
//       this.timedOut = true;
//       setTimeout(() => this.timedOut = false, 10);
//     }
//   }

//     this.icon.options = {
//       path: `assets/svg-jsons/${this.source.status}.json`,
//       autoplay: true,
//       loop: true,
//       rendererSettings: {
//         progressiveLoad: false,
//         preserveAspectRatio: 'xMidYMid meet'
//       }
//     };
//     switch (this.source.status) {
//       case 'active':
//         this.icon.size = {width: 15, height: 21};
//         break;
//       case 'downloading':
//         this.icon.size = {width: 29, height: 18};
//         break;
//       case 'downloading-agent':
//         this.icon.size = {width: 25, height: 18};
//         break;
//       case 'initializing':
//         this.icon.size = {width: 27, height: 18};
//         break;
//     }

// }

 openWizard(){
   this.isWizardOpen = true;
 }

 closeWizard(){
    this.isWizardOpen = false;
 }
}
