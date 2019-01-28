

import { WsService, HttpService } from '@app/services';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { State, selectSystem } from '@app/state/reducers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-target-wizard',
  templateUrl: './add-target-wizard.component.html',
  styleUrls: ['./add-target-wizard.component.scss']
})
export class AddTargetWizardComponent implements OnInit {
  isEmpty = true;
  defaults = [];
  error: any = {};
  hasErrors = false;
  isConnected: boolean;
  isPionnerConnected: boolean;
  vector: any;
  @Output() closeModal = new EventEmitter();

  constructor(
              public activeModal: NgbActiveModal,
              private httpService: HttpService,
              private modalService: NgbModal,
              private ws: WsService,
              private store: Store<State>) {

               }

  ngOnInit() {
    this.error = null;
    this.vector = {
      name: "X-Caliber",
      license: {
        used: 10,
        total: 100,
        tip: "Tip"
      },
      vectorState: "",
      vectorStateTip: "",
      vectorType: 'x-caliber',
      inputs: [
        {identifiers:[]}
      ]
    }

    this.store.select(selectSystem).pipe(map(system => system.internet.indicator.state === 'GREEN')).subscribe(connected => this.isConnected = connected);
    this.store.select(selectSystem).pipe(map(system => system.pioneer.indicator.state === 'GREEN')).subscribe(connected => 
      {this.vector.vectorState = connected})
    console.log(this.vector.vectorState);
    // this.getDefaults();
  }

  // getDefaults() {
  //   this.httpService.getDefaultAttackVectors().subscribe(defaults => {
  //     this.defaults = defaults;
  //     this.defaults.forEach(vector => this.error[vector.vector] = null);
  //     this.updateCheckedVectors();
  //   });
  // }

  trackVectors(index, item) {
    return item.id ? item.id : index;
  }
  closeModalFunc(){
    this.closeModal.emit();
}
  validateIdentifier(input: string, vector: string) {
    if (input.length > 0) {
      const isNumber = (/[+\d]/).test(input.charAt(0));
      const phoneRegex = new RegExp(/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{9,14}$/);
      if ( isNumber ) {
        if ( !phoneRegex.test(input) ) {
          this.error = 'Invalid phone number';
        } else {
          this.error = null;
        }
      } else {
        const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if ( !emailRegex.test(input) ) {
          this.error = 'Invalid email address';
        } else {
          this.error = null;
        }
      }
      this.isEmpty = false;
    } else {
      this.error = 'Phone or Email is required';
    }
    this.setHasError();
  }

  setHasError() {
    if(this.error){
      this.hasErrors = true;
    } else {
      this.hasErrors = false;
    }
  }
}
