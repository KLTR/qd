import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

@Injectable()
export class AppConfigService {
  private appConfig;

  constructor(private http: HttpClient) {}

  loadAppConfig() {
    return this.http.get('../../../assets/config/appConfig.json')
      .toPromise()
      .then(customData => {
          this.appConfig = customData;
      });
    }

    getConfig() {
      return this.appConfig;
    }
  }
