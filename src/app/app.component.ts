import {
  Component
} from '@angular/core';
import {
  HttpService,WsService
} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quantum-ui';

  constructor(
    private http: HttpService,
    private ws: WsService,
    )
  {  
    this.http.getConfig().subscribe();
    this.ws.open();
  }

}
