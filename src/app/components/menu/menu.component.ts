import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {MenuService} from './menu.service';
import { User } from '@app/models/user';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() user: User;
  isMenuOpen$: Observable<boolean>;

  constructor(private menuService: MenuService, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.isMenuOpen$ = this.menuService.menuState;
  }

  dispatchMenuCloseEvent() {
    this.menuService.toggleMenu(false);

  }

  moveToUsers() {
    this.dispatchMenuCloseEvent();
    this.router.navigate(['/users']);
  }

  moveToInterceptors() {
    this.dispatchMenuCloseEvent();
    this.router.navigate(['/interceptors']);
  }

  moveToExport() {
    this.dispatchMenuCloseEvent();
    this.router.navigate(['/export']);
  }

  moveToOperator() {
    this.dispatchMenuCloseEvent();
    this.router.navigate(['/export']);
  }

  moveToVersion() {
    this.dispatchMenuCloseEvent();
    this.router.navigate(['/version']);
  }

  moveToLogout() {
    this.dispatchMenuCloseEvent();
    this.authService.logout();
  }
}
