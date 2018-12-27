import {Pipe, PipeTransform} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Pipe({
  name: 'intelSortFilter'
})
export class IntelSortPipe implements PipeTransform {

  transform(sources: any): any {

    // const sortOrder = ['updateData', 'updatingFailed', 'downloadingData', 'processingRequest', 'fetchFailed', 'fetchData', 'noDataToFetch', 'appNotExist'];
    return sources.sort((a, b) => {
      return a.idx - b.idx;
    });
  }
}
