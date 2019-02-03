import { SatPopover } from '@ncstate/sat-popover';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {
@Input() source;


  constructor() { }

  ngOnInit() {
    console.log(this.source);
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
close(){
  console.log(this.source);
}
}
