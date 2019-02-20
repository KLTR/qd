import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'millToMinFilter',
  pure: false
})
export class MillToMinFilterPipe implements PipeTransform {

  transform(milliseconds: any): any {
    const minutes = Math.floor(+milliseconds / 60000);
    return minutes;
  }

}


