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

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.downloads = [
      {
        name: 'Thumbnails',
        size: '56MB',
        isChecked: false
      },
      {
        name: 'Videos',
        size: '23MB',
        isChecked: false
      },
      {
        name: 'Images',
        size: '6MB',
        isChecked: false
      },
      {
        name: 'Recording',
        size: '1.5MB',
        isChecked: false
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
    const result = {
      downloads: this.downloads.filter(item => item.isChecked),
      date: this.isRangeSelected ? this.selectedDateRange : false
    };
    this.activeModal.close(result);
  }
}
