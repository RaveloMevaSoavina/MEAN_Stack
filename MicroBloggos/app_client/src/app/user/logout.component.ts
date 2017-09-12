import { Router } from '@angular/router';
import { UserService } from './service/user.service';
import { Component } from '@angular/core';
@Component({
    selector: 'app-logout',
    templateUrl: './views/logout.component.html'
})
export class LogoutComponent {
    constructor(private userService: UserService, private router: Router) { }
    
    onLogout(){
        this.userService.logout();
        this.router.navigate(['auth', 'signin']);
    }
}