

import { WsService, HttpService } from '@app/services';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-add-target-wizard',
  templateUrl: './add-target-wizard.component.html',
  styleUrls: ['./add-target-wizard.component.scss']
})
export class AddTargetWizardComponent implements OnInit {
  isEmpty = true;
  defaults = [];
  noneChecked: boolean;
  error: any = {};
  hasErrors = false;
  isConnected: boolean;
  @Output() closeModal = new EventEmitter();

  constructor(
              private httpService: HttpService,
              private ws: WsService) {

               }

  ngOnInit() {
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
          this.error[vector] = 'Invalid phone number';
        } else {
          this.error[vector] = null;
        }
      } else {
        const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if ( !emailRegex.test(input) ) {
          this.error[vector] = 'Invalid email address';
        } else {
          this.error[vector] = null;
        }
      }
    } else {
      this.error[vector] = 'Phone or Email is required';
    }
    this.setHasError();
  }

  updateCheckedVectors(index?: any, event?: any) {
    if ( index !== undefined) {
      if (this.defaults[index].enabled && this.defaults[index].vectorState === 'OK' && this.isConnected) {
        this.defaults[index].checked = !this.defaults[index].checked;
        this.defaults[index].inputs.identifier = '';
        this.validateIdentifier(this.defaults[index].inputs.identifier, this.defaults[index].vector);
        if (!this.defaults[index].checked && this.error[this.defaults[index].vector]) {
          this.defaults[index].inputs.identifier = '';
          this.error[this.defaults[index].vector] = null;
          this.setHasError();
        }
      } else {
        if (event && event.target.checked) {
          event.target.checked = false;
          this.defaults[index].checked = false;
        }
      }
    }
    this.noneChecked = this.defaults.filter(vector => vector.checked).length === 0;
  }
  setHasError() {
    for (const error of this.error) {
      if (this.error.hasOwnProperty(error) && this.error[error]) {
        this.hasErrors = true;
        break;
      }
      this.hasErrors = false;
    }
  }
}
