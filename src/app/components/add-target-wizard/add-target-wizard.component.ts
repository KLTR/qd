import { Component, OnInit, HostListener, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-target-wizard',
  templateUrl: './add-target-wizard.component.html',
  styleUrls: ['./add-target-wizard.component.scss']
})
export class AddTargetWizardComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  // @HostListener('document:click', ['$event'])
  // onClick(event) {
  //   if (!this.el.nativeElement.contains(event.target) ) {
  //     this.closeModalFunc();
  //   }
  // }
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private el: ElementRef) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

closeModalFunc(){
    this.closeModal.emit();
}
}
