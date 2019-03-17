import { HttpService } from '@app/services';
import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-source-info',
  templateUrl: './source-info.component.html',
  styleUrls: ['./source-info.component.scss']
})
export class SourceInfoComponent implements OnInit {
@Input() source: any
tasks: any;
selectedInfo = 'apps';
selectedIntel = 'DEVICE_INFO'
contacts = [];
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getSourcesTasks(this.source.id).subscribe(res => {console.log(res),this.tasks = res.tasks})
    this.contacts = [
      {  
        name : 'Roy Levy',
        mobile : '0544753336' ,
        email : 'Hotmailsuck@gmail.com'
      },
      {   
        name : 'Tomer Pomodoro',
        mobile : '0544753312' ,
        email : 'gmailsucks@hotmail.com'
    },
    {   
      name : 'Zlatan Ibrahimovic',
      mobile : '0541753312' ,
      email : 'Shark@fish.com',
      profileImg: 'https://www.thewistle.com/wp-content/uploads/2017/10/Zlatan-Ibrahimovic.jpg'
  },
  {   
    name : 'Theirry Henry',
    mobile : '0241753312' ,
    email : 'Scorer@gunner.com'
}
    ]
  }


  selectInfo(info: string){
    this.selectedInfo = info;
  }
  selectIntel(intel: string){
    this.selectedIntel = intel;
  }
}
