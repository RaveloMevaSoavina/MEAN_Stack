import { UserService } from './service/user.service';
import { User } from './model/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-signin',
    templateUrl: './views/signin.component.html'
})
export class SigninComponent implements OnInit {
    myForm: FormGroup;

    constructor(private userService: UserService, private router: Router) { }

    onSubmit() {
        const user: User = new User(
            this.myForm.value.email,
            null,
            this.myForm.value.password
        )
        this.userService.signin(user).subscribe(
            data => {
                this.router.navigateByUrl('/')
            }
        )
        this.myForm.reset();
    }
    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
                Validators.minLength(4),
                Validators.maxLength(30)
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(20)
            ])
        });
    }
}