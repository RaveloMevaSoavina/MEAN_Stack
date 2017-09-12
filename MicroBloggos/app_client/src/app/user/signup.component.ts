import { Router } from '@angular/router';
import { User } from './model/user.model';
import { UserService } from './service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './views/signup.component.html'
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;

    constructor(private userService:UserService, private router: Router){}

    onSubmit(){
        const user:User = new User(
            this.myForm.value.email,
            this.myForm.value.username,
            this.myForm.value.password
        )
        this.userService.signup(user).subscribe(
            data => {
                console.log(data);
            }
        )
        this.myForm.reset();
    }
    ngOnInit(){
        this.myForm = new FormGroup({
            username: new FormControl(null,  [
                Validators.required,
                Validators.pattern("^[a-zA-Z0-9_]*$"),
                Validators.minLength(4),
                Validators.maxLength(20)
            ]),
            email: new FormControl(null,  [
                Validators.required,
                Validators.email,
                Validators.minLength(4),
                Validators.maxLength(30)
            ]),
            password: new FormControl(null,  [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(20)
            ])
        });
    }
}