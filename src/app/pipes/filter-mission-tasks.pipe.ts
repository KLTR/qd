import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMissionTasks'
})
export class FilterMissionTasksPipe implements PipeTransform {

  transform(tasks: any, args?: any): any {
    if (!tasks) {
      return tasks;
    }
    return tasks.filter(task => !task.mandatory);
  }

}
