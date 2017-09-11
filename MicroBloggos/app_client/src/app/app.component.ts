import { Component } from '@angular/core';
import { MessageService } from './message/service/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService]  
})
export class AppComponent {

}
