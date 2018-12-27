import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { HttpService, AuthService } from '@app/services';
import {  tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  model: any = {};
  returnUrl: string;
  public loginFailed: boolean;
  error$: Observable<string>;
  toShow = false;
  passwordType = 'password';

  constructor(private route: ActivatedRoute,
              private http: HttpService,
              private auth: AuthService
              ) {
  }

  ngOnInit() {
    this.error$ = this.auth.error$;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  login(f) {
    this.auth.login(f.value);
  }

  showPassword() {
    this.toShow = !this.toShow;
    this.passwordType = this.toShow ? 'text' : 'password';
  }

  ngOnDestroy() {
    this.loginFailed = false;
  }
}
