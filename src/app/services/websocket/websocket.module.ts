import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { WebsocketService } from './websocket.service';


export const SOCKET_URL_VAL = new InjectionToken<string>('socketUrlVal');
export const SOCKET_URL = new InjectionToken<string>('socketUrl');

export function socketUrlFactory(url: string): string {
  return url;
}

@NgModule()
export class WebSocketModule {
  constructor (@Optional() @SkipSelf() parentModule: WebSocketModule) {
    if (parentModule) {
      throw new Error(
        'WebSocketModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(socketUrl: string): ModuleWithProviders {
    return {
      ngModule: WebSocketModule,
      providers: [
        WebsocketService,
        { provide: SOCKET_URL_VAL, useValue: socketUrl },
        { provide: SOCKET_URL,
          deps: [SOCKET_URL_VAL],
          useFactory: socketUrlFactory
        }]
    }
  }
}
