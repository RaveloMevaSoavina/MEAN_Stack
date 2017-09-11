import { SignupComponent } from './user/signup.component';
import { SigninComponent } from './user/signin.component';
import { LogoutComponent } from './user/logout.component';
import { routing } from './app.routing';
import { UserComponent } from './user/user.component';
import { MessagesComponent } from './message/messages.component';
import { MessageComponent } from './message/message.component';
import { MessageListComponent } from './message/message.list.component';
import { MessageInputComponent } from './message/message.input.component';
import { HeaderComponent } from './header.component';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    MessageListComponent,
    MessageInputComponent,
    MessagesComponent,
    UserComponent,
    HeaderComponent,
    LogoutComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule, FormsModule, routing, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
