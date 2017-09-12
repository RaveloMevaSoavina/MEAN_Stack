import { UserService } from './service/user.service';
import { Component } from '@angular/core';
@Component({
    selector: 'app-user',
    templateUrl: './views/user.component.html'
})
export class UserComponent {
    constructor(private userService: UserService) { }

    isLoggedIn(){
        console.log(this.userService.isLoggedIn());
        this.userService.isLoggedIn()
    }
}