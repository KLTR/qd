import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '@app/services';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.scss']
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
