import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sourceByTypeFilter',
  pure: false
})
export class SourceByTypePipe implements PipeTransform {

  transform(sources: any, filter: any): any {
    if (!sources || !filter || filter.length === 0) {
      return sources;
    }
    return sources.filter(item => filter.indexOf(item.status) > -1);
  }

}


