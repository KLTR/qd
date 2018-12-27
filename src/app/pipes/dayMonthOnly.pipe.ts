import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dayMonthOnly'
})
export class DayMonthOnlyPipe implements PipeTransform {

  transform(value: string): string {
    const res = '';
    if (!value) {
      return '';
    }
   return moment(value).format('MMMM DD');
  }
}
