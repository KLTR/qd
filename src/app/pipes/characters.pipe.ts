import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'characters'
})
export class CharactersPipe implements PipeTransform {

  transform(value: string, args: number = 10, breakOnWord?: boolean): string {
    const res = '';
    if (value && value.length > args && args > 0) {
      value = value.substring(0, args);

      if (breakOnWord) {
        while (value.charAt(value.length - 1) === ' ') {
          value = value.substr(0, value.length - 1);
        }
      } else {
        const lastspace = value.lastIndexOf(' ');
        // get last space
        if (lastspace !== -1) {
          value = value.substr(0, lastspace);
        }
      }
      return `${value}...`;
    } else {
      return value;
    }
  }
}
