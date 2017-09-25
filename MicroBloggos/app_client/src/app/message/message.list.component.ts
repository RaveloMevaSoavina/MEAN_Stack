import { UserService } from './../user/service/user.service';
import { Component, OnInit } from "@angular/core";
import { Message } from './model/message.model';
import { MessageService } from './service/message.service';

@Component({
    selector: 'app-message-list',
    templateUrl: './views/message.list.component.html',
    styleUrls: ['./views/message.list.component.css']
})
export class MessageListComponent implements OnInit {
    private messages: Message[];
    constructor(private messageService:MessageService, private userService:UserService){}

    ngOnInit(){
        //pointer on service messages, so this.messages changes the same way
        this.messageService.getMessages()
            .subscribe(
                (messages: Message[]) => {
                    this.messages = messages
                }
            );
    }
    showMessageForm() {
        this.messageService.switchMessageForm();
    }
    isLoggedIn(){
        return this.userService.isLoggedIn();
    }   
}