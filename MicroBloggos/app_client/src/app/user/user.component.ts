import { UserService } from './service/user.service';
import { MessageService } from './../message/service/message.service';
import { User } from './model/user.model';

import * as $ from 'jquery';
import { Component, Input, Output, EventEmitter } from '@angular/core';

 @Component({
     selector: 'app-user',
     templateUrl: './views/user.component.html',
     styleUrls: ['./views/user.component.css']
 })
export class UserComponent{
    @Input() user:User;
    //@Output() editClicked = new EventEmitter<String>();
    constructor(private messageService:MessageService, private userService:UserService){}
    onEdit(event){
        //this.messageService.editMessage(this.user);
    }
    onDelete(event){
       /* this.messageService.deleteMessage(this.user).subscribe(
            //result => console.log(result)
        )*/
    }
    isLoggedIn(){
        return this.userService.isLoggedIn();
    }
    isUserMessage(){
        /*if(this.message.user._id == localStorage.getItem('userId')){
            return true;
        }
        return false;*/
    }
}