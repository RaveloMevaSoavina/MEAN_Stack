import { User } from './model/user.model';
import { UserService } from './../user/service/user.service';

import { Component, Input, Output, EventEmitter } from '@angular/core';

 @Component({
    selector: 'app-users',
    templateUrl: './views/users.component.html',
    styleUrls: ['./views/users.component.css']
})
export class UsersComponent{
    @Input() user:User;

    constructor(private userService:UserService){}
}