import {
  Component
} from '@angular/core';
import {
  HttpService, ConnectionService
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
    private connectionService: ConnectionService)
  {  
    this.http.getConfig().subscribe();
  }

}
