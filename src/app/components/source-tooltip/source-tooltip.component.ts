import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

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



  ngOnInit() {
    console.log(this.source);
  }

  closeTooltip() {
    this.close.emit();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
