import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pop-overs',
  templateUrl: './pop-overs.component.html',
  styleUrls: ['./pop-overs.component.scss']
})
export class PopOversComponent implements OnInit {
@Input() system: any;
@ViewChild('internetPop') public internetPop: any;
@ViewChild('alicePop') public alicePop: any;
@ViewChild('cloudPop') public cloudPop: any;
@ViewChild('pioneerPop') public pioneerPop: any;
@ViewChild('interceptorPop') public interceptorPop: any;
openedPop: any;
pops: any[];
  constructor() {
   }

  ngOnInit() {
        this.pops = [
        this.internetPop,
        this.alicePop,
        this.cloudPop,
        this.pioneerPop,
        this.interceptorPop
      ];
  }

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
  
}
