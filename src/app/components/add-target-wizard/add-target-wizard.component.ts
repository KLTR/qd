import {
  WsService,
  HttpService
} from '@app/services';
import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  NgbModal,
  NgbActiveModal
} from '@ng-bootstrap/ng-bootstrap';
import {
  Store
} from '@ngrx/store';
import {
  State,
  selectSystem
} from '@app/state/reducers';
import {
  map
} from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  isLoading = false;
  identifiers: any;
  selectedType: any;
  @Output() closeModal = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private httpService: HttpService,
    private modalService: NgbModal,
    private ws: WsService,
    private store: Store < State > ) {

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
      inputs: [{
        identifiers: []
      }],
      identifier: ""
    }
    this.selectedType = 'email';
    this.identifiers = [
      {
        type: this.selectedType,
        value: this.vector.identifier
      }
    ]
    this.store.select(selectSystem).pipe(map(system => system.internet.indicator.state === 'GREEN')).subscribe(connected => this.isConnected = connected);
    this.store.select(selectSystem).pipe(map(system => system.pioneer.indicator.state === 'GREEN')).subscribe(connected => {
      this.vector.vectorState = connected
    })

  }

  addTarget() {
    this.isLoading = true;
   this.identifiers = {
     identifiers:
        [
          {
          type: this.selectedType,
          value: this.vector.identifier
          }
      ]
    }
    
    setInterval(()=> {
      this.isLoading = false; 
    },5000); 
    this.httpService.createTarget(this.identifiers).subscribe(res => console.log(res));
    
  }


  trackVectors(index, item) {
    return item.id ? item.id : index;
  }
  closeModalFunc() {
    this.closeModal.emit();
  }

  // validateEmail(input: string, vector: string) {
  //   const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  //   if (input.length > 0) {
  //     this.isEmpty = false;
  //     if (!emailRegex.test(input)) {
  //       this.error = 'Invalid email address';
  //     } else {
  //       this.error = null;
  //     }
  //   } else {
  //     this.error = 'Phone or Email is required';
  //   }
  //   this.setHasError();
  // }
  // validatePhone(input: string, vector: string) {
  //   if (input.length > 0) {
  //     const phoneRegex = new RegExp(/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{9,14}$/);
  //     this.isEmpty = false;
  //     if (!phoneRegex.test(input)) {
  //       this.error = 'Invalid phone number';
  //     } else {
  //       this.error = null;
  //     }
  //   } else {
  //     this.error = 'Phone or Email is required';
  //   }
  //   this.setHasError();
  // }
  validateIdentifier(input: string) {
    if(!input){
      return
    }
    console.log(input)
    if (input.length > 0) {
      if ( this.selectedType === "phone" ) {
        const phoneRegex = new RegExp(/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{9,14}$/);
        if ( !phoneRegex.test(input) ) {
          this.error = 'Invalid phone number';
        } else {
          this.error = null;
          this.vector.identifier = input;
        }
      } else {
        const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if ( !emailRegex.test(input) ) {
          this.error = 'Invalid email address';
        } else {
          this.error = null;
          this.vector.identifier = input;
        }
      }
      this.isEmpty = false;
    } else {
      this.error = `${this.selectedType} is required`;
    }
    console.log(this.vector.inputs[0]);
    this.setHasError();
  }

  setHasError() {
    if (this.error) {
      this.hasErrors = true;
    } else {
      this.hasErrors = false;
    }
  }
}
