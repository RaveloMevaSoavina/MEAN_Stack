import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-signin',
    templateUrl: './views/signin.component.html'
})
export class SigninComponent implements OnInit {
    myForm: FormGroup;
    onSubmit(){
        console.log(this.myForm);
        this.myForm.reset();
    }
    ngOnInit(){
        this.myForm = new FormGroup({
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