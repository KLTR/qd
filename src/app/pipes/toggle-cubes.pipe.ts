import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toogleCubes',
  pure: false
})
export class ToogleCubesPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || filter === undefined) {
      return items;
    }
    return items.filter(item => item.id === filter.id);
  }
}
