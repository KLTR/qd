import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cubeIconsFilter',
  pure: false
})
export class CubeIconsPipe implements PipeTransform {

  transform(sources: any): any {

    function sorter(a, b) {
      return b.progress > a.progress;
    }

    return sources.slice().sort(
      sorter
    );
  }
}
