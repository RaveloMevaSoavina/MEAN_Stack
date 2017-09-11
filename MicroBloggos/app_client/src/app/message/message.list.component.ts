import { Component, OnInit } from "@angular/core";
import { Message } from './model/message.model';
import { MessageService } from './service/message.service';

@Component({
    selector: 'app-message-list',
    templateUrl: './views/message.list.component.html',
})
export class MessageListComponent implements OnInit {
    private messages: Message[];
    constructor(private messageService:MessageService){}

    ngOnInit(){
        //pointer on service messages, so this.messages changes the same way
        this.messages = this.messageService.getMessages();
    }
    
}