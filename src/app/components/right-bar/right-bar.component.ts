import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '@app/services';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }), // initial
        animate('1s cubic-bezier(.5, -0.6, 0.2, 1.5)', style({ transform: 'scale(1)', opacity: 1 })) // final
      ])
    ])
  ]
})
export class RightBarComponent implements OnInit {
  isOpen = false;
  selected = 'today';
  @Input() events: any[];

  constructor(private http: HttpService) {}

  ngOnInit() {}

  toggleNav() {
    this.isOpen = !this.isOpen;
  }
  toggleSelected(val) {
    this.selected = val;
  }
  removeEvent(event) {
    this.http.dismissEvent(event.id).subscribe(res => {
      const index: number = this.events.indexOf(event);
      if (index !== -1) {
        this.events.splice(index, 1);
        this.events = this.events.slice();
      }
    });
  }
}

// -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);
// transform: translate3d(100%, 0, 0) skewX(30deg);
// opacity: 0;
