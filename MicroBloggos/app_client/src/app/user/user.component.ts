import { OnInit, AfterViewInit } from '@angular/core';
import { UserService } from './service/user.service';
import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
@Component({
    selector: 'app-user',
    templateUrl: './views/user.component.html'
})
export class UserComponent {
    constructor(private userService: UserService) {}
    
    isLoggedIn(){
        return this.userService.isLoggedIn();
    }
}