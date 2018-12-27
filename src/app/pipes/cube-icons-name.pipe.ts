import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cubeIconsNameFilter'
})
export class CubeIconsNamePipe implements PipeTransform {
  svgIcons: Array<any> = ['active', 'shutting-down', 'arrow', 'collapse', 'collapse-section', 'device-active', 'downloading', 'inactive', 'info-second',
    'initializing', 'lost-connection-short', 'lost-connection-long', 'transferring-to-reign', 'wifi-issue', 'Asset_43', 'alert', 'apps', 'battery-low',
    'battery-mid', 'battery-4', 'power-on', 'battery_empty', 'device-battery-empty', 'battery-full', 'browser', 'callhistory', 'chat', 'contacts', 'device-battery-full',
    'hangout', 'hide-photo', 'info', 'interceptor', 'interceptor-failed', 'line', 'live_calls', 'log', 'emails', 'map', 'menu', 'messages', 'messenger', 'no_signal',
    'online', 'passwords', 'power', 'settings', 'show-photo', 'signal', 'skype', 'storage_1', 'storage-half', 'storage-empty', 'storage-full', 'telegram', 'tweeter',
    'viber', 'whatsapp', 'wickr', 'wifi_exellent', 'wifi_high', 'wifi-low', 'wifi-exellent', 'wifi-signal-full', 'avatar', 'internet', 'signal-no', 'signal_full',
    'signal_low', 'signal_middle', 'target', 'device-failed', 'exclamation-mark', 'apps-general', 'downloading-app', 'executing_1', 'draining', 'fetch', 'play', 'complete', 'waiting',
    'created', 'commited', 'delivered', 'acked', 'move-to-reign-device', 'reign', 'executing', 'atack-ad', 'atack-browser', 'atack-message', 'atack-telegram', 'atack-whatsapp',
    'browsing', 'browsing_secured', 'fetch_failed', 'locations', 'photos', 'profilepic', 'update_failed', 'wechat'];


  transform(tasks: any): any {

    tasks.forEach((task) => {
      if (task.icon) {
        if (this.svgIcons.includes(task.icon.toLowerCase())) {
          task.icon = task.icon.toLowerCase();
        } else {
          task.icon = 'info';
        }
      }
    });

    return tasks;
  }
}
