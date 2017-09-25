import { User } from './model/user.model';
import { UserService } from './../user/service/user.service';

import { Component, Input, Output, EventEmitter } from '@angular/core';

 @Component({
    selector: 'app-user',
    templateUrl: './views/user.component.html',
    styleUrls: ['./views/user.component.css']
})
export class UserComponent{
    @Input() user:User;

    constructor(private userService:UserService){}
}