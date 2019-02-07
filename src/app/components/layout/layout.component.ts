import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectUser, selectSystem } from '@app/state';
import { Observable } from 'rxjs';
import { User, SystemInfo } from '@app/models';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@app/services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user$: Observable<User> = this.store.select(selectUser);
  system$: Observable<SystemInfo> = this.store.select(selectSystem);
  alerts = [];
  constructor(private store: Store<State>, private route: ActivatedRoute, private httpService: HttpService) {
  }

  ngOnInit() {
 
  }
}
