import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'milisecondsParser'
})
export class MilisecondsParserPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment.utc(value).format('HH:mm:ss');
  }

}
