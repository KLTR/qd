import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortAppsFilter',
  pure: false
})
export class SortAppsPipe implements PipeTransform {

  transform(sources: any): any {
    const order = ['complete', 'executing', 'draining', 'created', 'commited', 'delivered', 'acked', 'fetch'];

    return sources.sort(
      function (a, b) {
        return order.indexOf(a.state) > order.indexOf(b.state);
      }
    );
  }
}
