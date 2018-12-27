import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blackListIntlItemsFilter',
  pure: false
})
export class BlackListIntlItemsPipe implements PipeTransform {

  transform(sources: any): any {
    const blackList: Array<any> = ['reign', 'wallPaper', 'profilePic', 'sms'];
    const sortedIcons: Array<any> = [];

      sources.forEach((item, index) => {
        if (blackList.indexOf(item.name) === -1) {
          sortedIcons.push(item);
        }
      });

    return sortedIcons;
  }
}
