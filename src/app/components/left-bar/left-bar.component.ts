import { HttpService } from '@app/services/http/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {

  missionData: any;
  temp: any;
  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.http.getActiveMission().subscribe( res => 
      {
        console.log(res),
        this.missionData = res,
        this.setPendingDevicesArray()
      })
  }

  setPendingDevicesArray(){
    let pending : any[];
    pending = this.missionData.pending_devices;
    for(let i = 0 ; i < pending.length ; i++){
      switch(Object.keys(pending[i])[0]){
        case 'pioneer':
        pending[i] = {...pending[i].pioneer, vectorType: 'pioneer'}
        break;
      }
    }
    this.missionData.pending_devices = pending;
      console.log(this.missionData);
  }


}
