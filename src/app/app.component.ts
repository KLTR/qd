import {
  Component
} from '@angular/core';
import {
  HttpService
} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quantum-ui';

  constructor(private http: HttpService)
  {  
    this.http.getConfig().subscribe();
  }

}
