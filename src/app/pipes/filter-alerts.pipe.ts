import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAlerts',
  pure: false
})
export class FilterAlertsPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || filter === undefined) {
      return items.filter(item => item.status === 'inactive' || item.status === 'active' );
    }
    return items.filter(item => item.status === 'active' );
  }
}
