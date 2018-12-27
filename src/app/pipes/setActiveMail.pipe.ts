import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setActiveMailPipe',
  pure: false
})
export class SetActiveMailPipe implements PipeTransform {

  transform(emails: any, filter: any): any {
    if (!emails || !filter) {
      return emails;
    }
    if (emails.length === 1) {
      emails[0].active = true;
    }
    return emails;
  }

}
