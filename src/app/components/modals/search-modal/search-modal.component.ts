import { Component, OnInit, Input, ChangeDetectorRef, SimpleChange, HostListener, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements OnInit, OnDestroy {
  @Input() searchResult: any[];
  @Output() clearSearchResults = new EventEmitter();
  @HostListener('document:click', ['$event'])
  onClick(event) {
    if (!this.el.nativeElement.contains(event.target) ) {
      if(this.searchResult.length > 0){
        this.searchResult = [];
        this.clearSearchResults.emit();
      }
    }
  }
  constructor(
    private cdRef: ChangeDetectorRef,
    private el: ElementRef) { }

  ngOnInit() {

  }
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
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

