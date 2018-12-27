import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChange, ViewEncapsulation } from '@angular/core';
import { IconService } from '@app/services';
// import { SafeHtmlPipe } from '@quadream/ui-common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  template: ``,
  styles: [`app-svg-icon {
    display: inline-block;
  }`],
  encapsulation: ViewEncapsulation.None
})
export class SvgIconComponent implements OnInit, OnChanges {
  @HostBinding('innerHtml') inner;
  @Input() name: string;
  @Input() size: number;
  mobWidth: any;
  svgData = '';
  constructor(private sanitizer: DomSanitizer, private iconService: IconService) {
    this.mobWidth = (window.screen.width);
   }

  ngOnInit() {
    if (this.name) {
      this.setSVG();
    }
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    for (const change in changes) {
      if (!changes[change].firstChange) {
        if (changes[change].previousValue !== changes[change].currentValue) {
          this[change] = changes[change].currentValue;
          if (change === 'name' || change === 'size') {
            this.setSVG();
          }
        }
      }
    }
  }

  private setSVG() {
    // if (this.mobWidth < 1920) {
    //   this.size = 12.5;
    // }
    // if (this.mobWidth < 1080) {
    //   this.size = 8;
    // }
    this.svgData = this.iconService.getIcon(this.name, this.size);
    this.inner = this.sanitizer.bypassSecurityTrustHtml(this.svgData);
  }
}
