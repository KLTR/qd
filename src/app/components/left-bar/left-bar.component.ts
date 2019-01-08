import { HttpService } from '@app/services/http/http.service';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {

 @Input() missionData: any;
  temp: any;
  isWizardOpen = false;
  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    console.log(this.missionData);
  }

 ngOnChanges(changes: SimpleChanges): void {
   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
   //Add '${implements OnChanges}' to the class.
   console.log(changes)
 }

 openWizard(){
   this.isWizardOpen = true;
 }

 closeWizard(){
    this.isWizardOpen = false;
 }
}
