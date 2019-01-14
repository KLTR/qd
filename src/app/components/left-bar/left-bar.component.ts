import { HttpService } from '@app/services/http/http.service';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {

 @Input() missionData: any;
  temp: any;
  isWizardOpen = false;
  constructor(
    private http: HttpService
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
    case "PENDING":
    break;
    case "IN_PROGRESS":
    break;
    case "FAILED":
    return 'status-lost-connection-long'
    case "COMPLETED":
    return 'status-active'
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
