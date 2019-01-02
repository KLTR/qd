import { Component, OnInit, Input, ChangeDetectorRef, SimpleChange, HostListener, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements OnInit, OnDestroy {
  @Input() searchResult: any[];
  @HostListener('document:click', ['$event'])
  onClick(event) {
    if (!this.el.nativeElement.contains(event.target) ) {
      this.searchResult = [];
    }
  }
  constructor(
    private cdRef: ChangeDetectorRef,
    private el: ElementRef) { }

  ngOnInit() {

  }
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    console.log(this.searchResult)
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  formatString(str){
    return str.replace(/\//g, ' > ')
  }
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
}
}

