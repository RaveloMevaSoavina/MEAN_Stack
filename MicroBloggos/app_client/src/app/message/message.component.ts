import { Message } from './model//message.model';
import { MessageService } from './service/message.service';

import { Component, Input, Output, EventEmitter } from '@angular/core';

 @Component({
     selector: 'app-message',
     templateUrl: './views/message.component.html',
     styleUrls: ['./views/message.component.css']
 })
export class MessageComponent{
    @Input() message:Message;
    //@Output() editClicked = new EventEmitter<String>();
    constructor(private messageService:MessageService){}
    onEdit(event){
        this.messageService.editMessage(this.message);
    }
    onDelete(event){
        this.messageService.deleteMessage(this.message).subscribe(
            result => console.log(result)
        )
    }
}