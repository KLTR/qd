import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tooltipDataFilter',
  pure: false
})
export class TooltipDataFilterPipe implements PipeTransform {

  transform(sources: any): any {
    const itemShowingInTooltip = ['phone number', 'last seen', 'mac address', 'interception', 'device', 'ip', 'quality signal'];
    return sources.filter(item => itemShowingInTooltip.indexOf(item.key) !== -1);
  }

}
