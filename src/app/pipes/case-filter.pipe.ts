import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caseFilter',
  pure: false
})
export class CaseFilterPipe implements PipeTransform {

  transform(cases: any, filter: any): any {
    if (!cases || !filter) {
      return cases;
    }
    return cases.filter(item => item.state.indexOf(filter.state) !== -1);
  }

}


