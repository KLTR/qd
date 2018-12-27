import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getFilenameFromUrl',
  pure: false
})
export class GetFilenameFromUrlPipe implements PipeTransform {

  transform(source: any): any {

    const filename = source.substring(source.lastIndexOf('/') + 1 );

    return filename;
  }
}
