import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bitesToKb',
  pure: false
})
export class BitesToKbPipe implements PipeTransform {


  private units = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];

  transform(bytes: number) {
    if ( isNaN( parseFloat( String(bytes) )) || ! isFinite( bytes ) ) return '?';

    let unit = 0;

    while ( bytes >= 1024 ) {
      bytes /= 1024;
      unit ++;
    }

    return bytes.toFixed( + 2 ) + ' ' + this.units[ unit ];
  }

}


