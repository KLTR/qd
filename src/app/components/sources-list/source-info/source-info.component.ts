import { HttpService } from '@app/services';
import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-source-info',
  templateUrl: './source-info.component.html',
  styleUrls: ['./source-info.component.scss']
})
export class SourceInfoComponent implements OnInit {
@Input() source: any
tasks: any;
selectedInfo = 'apps';
selectedIntel = 'DEVICE_INFO'
contacts = [];
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getSourcesTasks(this.source.id).subscribe(res => {console.log(res),this.tasks = res.tasks})
  }


  selectInfo(info: string){
    this.selectedInfo = info;
  }
  selectIntel(intel: string){
    this.selectedIntel = intel;
  }
}
