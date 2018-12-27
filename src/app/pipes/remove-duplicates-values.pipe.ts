import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDuplicates',
  pure: false
})
export class RemoveDuplicatesPipe implements PipeTransform {
  public transform(values: any[], key: string): any[] {
    if (!values || !values.length) return [];
    return values = values.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t[key] === item[key]
      ))
    );
  }
}
