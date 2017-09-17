import { UserGuardService } from './service/user.guard.service';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { LogoutComponent } from './logout.component';

export const USER_ROUTES:Routes = [
    { path: '', redirectTo: 'signup', pathMatch: 'full'},
    { path: 'signup', component: SignupComponent, canActivate: [UserGuardService] },
    { path: 'signin', component: SigninComponent, canActivate: [UserGuardService] },
    { path: 'logout', component: LogoutComponent, canActivate: [UserGuardService] }
];
//export const routing = RouterModule.forRoot(APP_ROUTES);