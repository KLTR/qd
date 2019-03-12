import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-source-info',
  templateUrl: './source-info.component.html',
  styleUrls: ['./source-info.component.scss']
})
export class SourceInfoComponent implements OnInit {
@Input() source: any
selectedInfo = 'apps';
selectedIntel = 'device-info'
  constructor() { }

  ngOnInit() {
  }


  selectInfo(info: string){
    this.selectedInfo = info;
  }
  selectIntel(intel: string){
    this.selectedIntel = intel;
  }
}
