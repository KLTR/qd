import { HttpService } from '@app/services';
import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.scss']
})
export class RightBarComponent implements OnInit {
  isOpen = false;
  selected = "today"
  @Input() events: any[];


  constructor(private http:HttpService) {}

  ngOnInit() {}

  toggleNav() {
    this.isOpen = !this.isOpen;
  }
  toggleSelected(val) {
    this.selected = val;
  }
  removeEvent(eventId) {
    console.log(eventId);
    this.http.dismissEvent(eventId).subscribe(res => console.log(res));
    // this.events.splice(index, 1);
  }
}
