import { Flash } from './../../flashs/flash.model';
import { FlashService } from './../../flashs/flash.service';
import { User } from "../model/user.model";
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from 'rxjs'

@Injectable()
export class UserService {

    private users: User[] = [];
    userIsEditEvent = new EventEmitter<User>();
    my_headers = new Headers({ 'content-type': 'application/json' });

    constructor(private http: Http, private flashService:FlashService) { }
    signup(user: User) {
        const body = JSON.stringify(user);
        console.log('register', user);
        return this.http.post('http://127.0.0.1:3000/user/register', body, { headers: this.my_headers })
            .map((response: Response) => {
                const result = response.json();
                user = new User(
                           result.obj.email,
                           result.obj.username,
                           null,
                           result.obj._id,
                           result.messagesId,
                           result.obj.createdAt,
                           result.obj.updatedAt
                        );    
                this.users.push(user);
                this.flashService.handleFlash(new Flash('user signup', 'Signed up successfully !'));
                return user;
            })
            .catch((error: Response) => {
                this.flashService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
 
    signin(user: User) {
        const body = JSON.stringify(user);
        console.log(user);
        return this.http.post('http://127.0.0.1:3000/user/login', body, { headers: this.my_headers })
            .map((response: Response) => {
                const result = response.json();
                localStorage.setItem('token', result.token);
                localStorage.setItem('userId', result.userId);
                this.flashService.handleFlash(new Flash('user login', 'Logged in successfully !'));
                return user;
            })
            .catch((error: Response) => {
                this.flashService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    logout(){
        localStorage.clear();
    }
    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }
    getUsers() {
        return this.http.get('http://127.0.0.1:3000/users')
            .map((response: Response) => {
                const users = response.json().obj;
                let arr: User[] = [];
                for (let obj of users) {
                    let user = new User(
                        obj.email,
                        obj.username,
                        null,
                        obj._id,
                        obj.messagesId,
                        new Date(obj.createdAt),
                        new Date(obj.updatedAt)
                    );
                    arr.push(user);
                }
                this.users = arr;
                return arr;
            })
            .catch((error: Response) => {
                this.flashService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateUser(user: User){
        const body = JSON.stringify(user);
        return this.http.patch('http://127.0.0.1:3000/users/'+user._id, body, { headers: this.my_headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.flashService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    
    editUser(user: User) {
        this.userIsEditEvent.emit(user);
    }

    deleteUser(user: User) {
        this.users.splice(this.users.indexOf(user), 1);
        return this.http.delete('http://127.0.0.1:3000/users/'+user._id)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.flashService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}