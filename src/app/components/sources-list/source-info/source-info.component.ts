import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
contacts$ : Observable<any>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // TODO: switch to live data.
    this.contacts$ = this.http.get('./assets/jsons/contacts.json'); 
  }


  selectInfo(info: string){
    this.selectedInfo = info;
  }
  selectIntel(intel: string){
    this.selectedIntel = intel;
  }
}
