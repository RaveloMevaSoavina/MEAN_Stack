import { UserService } from './service/user.service';
import { User } from './model/user.model';

import * as $ from 'jquery';
import { Component, Input, Output, EventEmitter } from '@angular/core';

 @Component({
     selector: 'app-userprofile',
     templateUrl: './views/userprofile.component.html',
     styleUrls: ['./views/userprofile.component.css']
 })
export class UserProfileComponent{
    @Input() user:User;
    //@Output() editClicked = new EventEmitter<String>();
    constructor(private userService:UserService){}
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