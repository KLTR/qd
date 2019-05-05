import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-internet',
  templateUrl: './internet.component.html',
  styleUrls: ['./internet.component.scss']
})
export class InternetComponent implements OnInit {
  @Input() internet;
  internetStatus: string;
  constructor() {}

  ngOnInit() {
    this.getInternetMode();
  }

  getInternetMode() {
    if (this.internet) {
      if (this.internet.indicator.state === 'GREEN') {
        this.internetStatus = 'Connected';
      } else {
        this.internetStatus = 'Disconnected';
      }
    }
  }
}
