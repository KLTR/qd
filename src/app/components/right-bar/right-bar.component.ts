import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '@app/services';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        // each time the binding value changes
        query(':leave', [stagger(100, [animate('0.35s', style({ opacity: 0 }))])], {
          optional: true
        }),
        query(':enter', [style({ opacity: 0 }), stagger(100, [animate('0.5s', style({ opacity: 1 }))])], { optional: true })
      ])
    ])
  ]
  // animations: [
  // trigger('listAnimation', [
  // transition('* => *', [
  // query(':leave', style({ transform: 'translateX(-100%)' })),
  // query(':enter', stagger('100ms', [animate('200ms', style({ transform: 'translateX(0)' }))]))
  // ])
  // ])
  // ]
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
