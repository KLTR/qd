import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-source-tooltip',
  templateUrl: './source-tooltip.component.html',
  styleUrls: ['./source-tooltip.component.scss']
})
export class SourceTooltipComponent implements OnInit, OnDestroy {
  @Input() source;
  @Output() close = new EventEmitter();
  deviceName: string;
  constructor() {}

  ngOnInit() {}

  closeTooltip() {
    this.close.emit();
  }
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
