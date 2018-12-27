import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sourceFilter',
  pure: false
})
export class SourceFilterPipe implements PipeTransform {

  transform(sources: any): any {
    const itemNotShowingInPanel = ['shutting-down', 'inactive', 'reign-completed', 'transferring-to-reign'];
    return sources.filter(item => itemNotShowingInPanel.indexOf(item.status) === -1);
  }

}


