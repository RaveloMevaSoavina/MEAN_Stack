import { UserComponent } from './user/user.component';
import { USER_ROUTES } from './user/user.routes';

import { MessagesComponent } from './message/messages.component';
import { Routes, RouterModule } from '@angular/router';
const APP_ROUTES:Routes = [
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: UserComponent, children: USER_ROUTES}    
];
export const routing = RouterModule.forRoot(APP_ROUTES);