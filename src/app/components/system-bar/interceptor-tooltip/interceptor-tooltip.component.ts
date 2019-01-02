import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpService } from '@app/services';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-interceptor-tooltip',
  templateUrl: './interceptor-tooltip.component.html',
  styleUrls: ['./interceptor-tooltip.component.scss']
})
export class InterceptorTooltipComponent implements OnInit, OnDestroy {
  @Input() interceptor;
  @Output() closeTip = new EventEmitter();
  isOpened = false;
  interceptors: any[];
  @HostListener('document:click', ['$event'])
  onClick(event) {
    if (!this.el.nativeElement.contains(event.target) && this.isOpened) {
      this.closeTooltip();
    }
  }

  constructor(private el: ElementRef, private http: HttpService) {
  }

  ngOnInit() {
    this.isOpened = false;
    if (this.interceptors) {
      // this.isOpened = true;
    }
    // this.getInterceptors();
  }

  getInterceptors() {
    // this.http.getInterceptors().subscribe(interceptors => {
    //   this.interceptors = interceptors;
    //   this.isOpened = true;
    // });
  }

  attachInterceptor(interceptor) {
    // this.detachInterceptor(interceptor).pipe(switchMap(() => this.http.attachInterceptor(interceptor.id))).subscribe();
  }

  // detachInterceptor(interceptor): Observable<any> {
  //   return this.http.detachInterceptor(interceptor.id);
  // }

  closeTooltip() {
    this.closeTip.emit();
  }

  ngOnDestroy() {
    this.isOpened = false;
  }
}
