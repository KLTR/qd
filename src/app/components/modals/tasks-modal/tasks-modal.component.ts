import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tasks-modal',
  templateUrl: './tasks-modal.component.html',
  styleUrls: ['./tasks-modal.component.scss']
})
export class TasksModalComponent implements OnInit {
  @Input() intel: any;
  downloads: any;
  isRangeSelected = false;
  selectedDateRange: any;
  result: any;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.downloads = [
      {
        name: 'Thumbnails',
        size: '56MB',
        isChecked: true
      },
      {
        name: 'Videos',
        size: '23MB',
        isChecked: true
      },
      {
        name: 'Images',
        size: '6MB',
        isChecked: true
      },
      {
        name: 'Recording',
        size: '1.5MB',
        isChecked: true
      }
    ];
  }

  setDate(date) {
    this.selectedDateRange = date;
  }

  selectDateRange(range: any) {
    if (range === 'all') {
      this.isRangeSelected = false;
      return;
    } else {
      this.isRangeSelected = true;
    }
  }
  setTask() {
    if (this.isRangeSelected && this.selectedDateRange) {
      this.result = {
        downloads: this.downloads.filter(item => item.isChecked).map(item => item),
        date: this.selectedDateRange,
        isRangeSelected: true
      };
    } else {
      this.result = {
        downloads: this.downloads.filter(item => item.isChecked),
        isRangeSelected: false
      };
    }
    this.activeModal.close(this.result);
  }
}
