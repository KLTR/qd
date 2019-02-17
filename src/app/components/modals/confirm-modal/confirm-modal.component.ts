import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  styleUrls: ['./confirm-modal.component.scss'],
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
