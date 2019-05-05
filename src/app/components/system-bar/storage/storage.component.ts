import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {
  @Input() storage;
  diskStatus: string;
  constructor() {}

  ngOnInit() {}
  getDiskSpace() {
    if (this.storage) {
      switch (this.storage.indicator.state) {
        case 'GREEN':
          this.diskStatus = 'storage-full';
          break;
        case 'YELLOW':
          this.diskStatus = 'storage-half';
          break;
        case 'RED':
          this.diskStatus = 'storage-empty';
          break;
        default:
          this.diskStatus = 'storage-empty';
      }
    }
  }
}
