import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'missionWizardOperators'
})
export class MissionWizardOperatorsPipe implements PipeTransform {

  transform(operators: any): any {
    if (!operators) {
      return operators;
    }
    return operators.filter(operator => !operator.admin);
  }

}
