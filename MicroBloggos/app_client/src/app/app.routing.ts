import { UsersListComponent } from './user/users.list.component';
import { UserNavComponent } from './user/user.nav.component';
import { USER_ROUTES } from './user/user.routes';

import { MessagesComponent } from './message/messages.component';
import { Routes, RouterModule } from '@angular/router';
const APP_ROUTES:Routes = [
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },
    { path: 'users', component: UsersListComponent},    
    { path: 'auth', component: UserNavComponent, children: USER_ROUTES},
];
export const routing = RouterModule.forRoot(APP_ROUTES);