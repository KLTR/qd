import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'signalStrenght',
  pure: false
})

export class SignalStrenghtPipe implements PipeTransform {

  transform(signal: any): any {
    switch (signal) {
      case 4 :
        return 'wifi-signal-full';
      case 3 :
      case 0 :
      case 1 :
      case 2 :
        return 'wifi-no-signal';
    }
  }

}
