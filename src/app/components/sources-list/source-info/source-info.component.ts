import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService, WsService } from '@app/services';

@Component({
  selector: 'app-source-info',
  templateUrl: './source-info.component.html',
  styleUrls: ['./source-info.component.scss']
})
export class SourceInfoComponent implements OnInit {
  @Input() source: any;
  data: any;
  tasks: any;
  tasksView: any;
  selectedInfo = 'apps';
  selectedIntel = 'deviceinfo';
  messages: any;

  constructor(private http: HttpService, private route: ActivatedRoute, private ws: WsService) {
    this.ws.messages.subscribe(msg => this.catchWebSocketEvents(msg));
  }

  ngOnInit() {
    this.http.getSourceIntels(this.source.id).subscribe(res => {
      console.log(res), (this.tasks = res.tasks);
    });
    this.getTasks();
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
      console.log(res), (this.tasksView = res);
    });
  }
  selectIntel(intel: string) {
    intel = intel.toLowerCase();
    this.data = null;
    this.http.getIntel(intel, this.source.id).subscribe(
      res => {
        if (res === this.data) {
          return;
        }
        console.log(res), (this.data = res), (this.selectedIntel = intel);
      },
      err => {
        console.log(err);
      }
    );
  }
  onSelectSession(sessionId) {
    this.http.getSessionMessages(this.source.id, this.selectedIntel.toLowerCase(), sessionId).subscribe(res => {
      console.log(res), (this.messages = res);
    });
  }

  catchWebSocketEvents(msg) {
    if (Object.keys(msg)[0] === 'error') {
      return;
    }
    switch (Object.keys(msg.result)[0]) {
      // System
      case 'tasks':
        this.tasksView = msg.result.tasks;
        break;
    }
    this.tasksView = Object.assign({}, this.tasksView);
  }
}
