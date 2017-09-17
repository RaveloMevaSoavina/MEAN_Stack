import { UserService } from './user.service';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class UserGuardService implements CanActivate {

    constructor(private userService: UserService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {  
        if (route.url[0].path == 'signin') {
            if (this.userService.isLoggedIn()) {
                this.router.navigate(['/auth/logout']);
                return false;
            } else {
                return true;
            }
        }
        else if (route.url[0].path == 'signup') {
            if (this.userService.isLoggedIn()) {
                this.router.navigate(['/auth/logout']);
                return false;
            } else {
                return true;
            }
        }
        else if (route.url[0].path == 'logout') {
            if (!this.userService.isLoggedIn()) {
                this.router.navigate(['/auth/signin']);
                return false;
            } else {
                return true;
            }
        }
    }
}