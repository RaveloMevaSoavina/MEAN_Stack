import { UserComponent } from './user/user.component';
import { UsersComponent } from './user/users.component';
import { UserListComponent } from './user/user.list.component';
import { UserGuardService } from './user/service/user.guard.service';
import { FlashService } from './flashs/flash.service';
import { FlashComponent } from './flashs/flash.component';
import { UserService } from './user/service/user.service';
import { MessageService } from './message/service/message.service';
import { SignupComponent } from './user/signup.component';
import { SigninComponent } from './user/signin.component';
import { LogoutComponent } from './user/logout.component';
import { routing } from './app.routing';
import { UserNavComponent } from './user/user.nav.component';
import { MessagesComponent } from './message/messages.component';
import { MessageComponent } from './message/message.component';
import { MessageListComponent } from './message/message.list.component';
import { MessageInputComponent } from './message/message.input.component';
import { HeaderComponent } from './header.component';
import { HttpModule, Http } from "@angular/http";
import { APP_BASE_HREF } from '@angular/common';
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
    UserNavComponent,
    HeaderComponent,
    LogoutComponent,
    SigninComponent,
    SignupComponent,
    FlashComponent,
    UserComponent,
    UserListComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule, FormsModule, routing, ReactiveFormsModule, HttpModule
  ],
  providers: [MessageService, UserService, FlashService, UserGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }