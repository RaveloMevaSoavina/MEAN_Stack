import { Component, OnInit } from "@angular/core";
import { User } from './model/user.model';
import { UserService } from './service/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './views/user.list.component.html',
    styleUrls: ['./views/user.list.component.css']
})
export class UserListComponent implements OnInit {
    private users: User[];

    constructor(private userService:UserService){}

    ngOnInit(){
        this.userService.getUsers()
            .subscribe(
                (users: User[]) => {
                    this.users = users
                }
            );
    }
}
 