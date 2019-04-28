import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '@app/services';

@Component({
  selector: 'app-source-info',
  templateUrl: './source-info.component.html',
  styleUrls: ['./source-info.component.scss']
})
export class SourceInfoComponent implements OnInit {
  @Input() source: any;
  data: any;
  tasks: any;
  selectedInfo = 'apps';
  selectedIntel = 'deviceinfo';
  contacts = [];
  messages = [];
  sessions = [];
  callHistory = [];
  passwords = [];
  apps = [];
  calls = [];
  browser: any;
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.http.getSourceIntels(this.source.id).subscribe(res => {
      console.log(res), (this.tasks = res.tasks);
    });
    this.selectIntel('deviceinfo');
  }
  taskAction(event, task: string) {
    event.stopPropagation();
    this.http.taskAction(task, this.source.id).subscribe(res => console.log(res));
  }
  selectInfo(info: string) {
    if (info === 'tasks') {
      this.getTasks();
    }
    this.selectedInfo = info;
  }
  getTasks() {
    this.http.getTasks(this.source.id).subscribe(res => {
      console.log(res), (this.data = res);
    });
  }
  selectIntel(intel: string) {
    intel = intel.toLowerCase();
    this.data = null;
    this.http.getIntel(intel, this.source.id).subscribe(
      res => {
        console.log(res), (this.data = res), (this.selectedIntel = intel);
      },
      err => {
        console.log(err);
      }
    );
  }
  onSelectSession(event) {
    console.log(event);
  }
}
