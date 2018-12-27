import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class MenuService {

  private menuStateSubject: BehaviorSubject<boolean>;

  constructor() {
    this.menuStateSubject = new BehaviorSubject(false);
  }

  toggleMenu(override?: boolean) {
    if (!override) {
      this.menuStateSubject.next(!this.menuStateSubject.value);
    } else {
      this.menuStateSubject.next(override);
    }
  }


  get menuState() {
    return this.menuStateSubject.asObservable();
  }
}
