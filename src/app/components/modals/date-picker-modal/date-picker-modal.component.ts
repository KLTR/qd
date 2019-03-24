import { NgbDate, NgbDatepicker, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker-modal',
  templateUrl: './date-picker-modal.component.html',
  styleUrls: ['./date-picker-modal.component.scss']
})
export class DatePickerModalComponent implements OnInit {
  selectedDateRange: any;
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  @ViewChild('d') public datePicker: NgbDatepicker;
  isDpShown = false;
  @Output() dateRangeSelected: EventEmitter<any> = new EventEmitter();
  constructor( private calendar: NgbCalendar,) {
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getNext(calendar.getToday(), 'd', 10);
   }

  ngOnInit() {
  }


  onDateSelection(date: NgbDate) {
    // this.selectedDateRange = null;
    this.isDpShown = true;
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      let fromStr =  new Date(`${this.fromDate.year}/${this.fromDate.month}/${this.fromDate.day}`);
      this.selectedDateRange = {
        from: moment(fromStr).toISOString(),
        // to: ''
      }
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      let fromStr =  new Date(`${this.fromDate.year}/${this.fromDate.month}/${this.fromDate.day}`);
      let toStr = new Date(`${this.toDate.year}/${this.toDate.month}/${this.toDate.day}`);
      this.selectedDateRange = {
        from: moment(fromStr).toISOString(),
        to: moment(toStr).toISOString()
      }
      this.isDpShown = false;
      this.dateRangeSelected.emit(this.selectedDateRange);
    } else {
      this.toDate = null;
      this.fromDate = date;
      let fromStr =  new Date(`${this.fromDate.year}/${this.fromDate.month}/${this.fromDate.day}`);
      this.selectedDateRange = {
        from: moment(fromStr).toISOString(),
        // to: ''
      }
    }
  }
applyDate(){
  this.isDpShown = false;
}
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

}
