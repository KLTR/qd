import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksModalComponent } from '@app/components/modals/tasks-modal/tasks-modal.component';
import { HttpService, WsService } from '@app/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  isServerError = false;
  errorText: string;
  constructor(private http: HttpService, private route: ActivatedRoute, private ws: WsService, private modalService: NgbModal) {
    this.ws.messages.subscribe(msg => this.catchWebSocketEvents(msg));
  }

  ngOnInit() {
    this.http.getSourceIntels(this.source.id).subscribe(res => {
      console.log(res), (this.tasks = res.tasks);
    });
    this.getTasks();
    this.selectIntel('deviceinfo');
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
    this.selectedIntel = intel;
    this.http.getIntel(intel, this.source.id).subscribe(
      res => {
        if (res === this.data) {
          return;
        }
        this.isServerError = false;
        console.log(res), (this.data = res);
      },
      err => {
        this.isServerError = true;
        this.errorText = err.statusText;
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

  taskAction(event, taskName) {
    const taskModal = this.modalService.open(TasksModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static'
    });
    taskModal.componentInstance.intel = taskName;
    taskModal.result.then(result => {
      console.log(result);
      if (result) {
        // Call http service
      }
    });
  }

  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
}
