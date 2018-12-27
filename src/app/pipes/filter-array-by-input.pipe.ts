import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArrayByInput',
  pure: false
})
export class FilterArrayByInputPipe implements PipeTransform {
  public transform(values: any[], key: string, filter: string): any[] {
    if (!values || !values.length) return [];
    if (!filter) return values;

    values.reduce((a, b) => {
      return a[key] === b[key];
    });

    return values.filter((v) => {
      return v[key].toLowerCase().indexOf(filter) >= 0;
    });
  }
}
