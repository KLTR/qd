import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@app/services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  alerts = [];
  user: any;
  system: any;
  constructor( private route: ActivatedRoute, private httpService: HttpService) {
  }

  ngOnInit() {
    this.httpService.getDashboard().subscribe(res => {console.log(res), this.user = res.user, this.system = res})
  }
}
