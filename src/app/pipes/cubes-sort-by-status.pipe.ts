import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortCubesByStatus'
})
export class SortCubesByStatusPipe implements PipeTransform {

  transform(sources: any): any {
    const init = ['downloading-agent', 'initializing'];
    const active = ['downloading', 'lost-connection-short', 'lost-connection-long', 'shutting-down', 'active'];
    const inactive = ['transferring-to-reign', 'reign', 'inactive'];

    return sources.sort((a, b) => {
        if (init.includes(a.status)) {
          if (init.includes(b.status)) return 0;
          if (active.includes(b.status) || inactive.includes(b.status)) return -1;
        } else if (active.includes(a.status)) {
          if (active.includes(b.status)) return 0;
          if (init.includes(b.status)) return 1;
          if (inactive.includes(b.status)) return -1;
        } else {
          if (inactive.includes(b.status)) return 0;
          if (active.includes(b.status) || init.includes(b.status)) return 1;
        }
      }
    );
  }
}
