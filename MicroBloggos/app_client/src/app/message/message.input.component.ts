import { Component, OnInit } from "@angular/core";
import { Message } from './model/message.model';
import { MessageService } from './service/message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
    selector: 'app-message-input',
    templateUrl: './views/message.input.component.html',
    styleUrls: ['./views/message.input.component.css']
})
export class MessageInputComponent implements OnInit {
    myForm: FormGroup;
    message: Message;
    error: any;
    showForm : boolean = true;
    constructor(private messageService: MessageService, private router: Router) { }

    onSubmit() {
        if (this.message) {//message préchargé, on est en mode édition
            this.message.description = this.myForm.value.description;
            console.log(this.message);
            this.messageService.updateMessage(this.message)
                .subscribe(
                result => {},
                error => {},
            )
            this.message = null;
        } else {//aucun message défini, on appelle methode addmessage
            const message = new Message(this.myForm.value.description);
            this.messageService.addMessage(message)
                .subscribe(
                result => { },
                error => {
                    if (error.hasOwnProperty('title')) {
                        if (error.title.indexOf("Authentication") > -1) {
                            localStorage.clear();
                            this.router.navigate(['auth', 'signin']);
                        }
                    }
                },
            );
        }
        this.showForm = true;
        $('.message-input').slideUp("normal");
        this.myForm.reset();
    }

    onCancel() {
        $('.message-input').slideUp("normal");
        this.message = null;
        this.showForm = true;
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            description: new FormControl(null, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(140)
            ]),
        });
        this.messageService.messageEditEvent.subscribe(
            (message: Message) => {
                if(this.showForm) {
                    $('.message-input').slideDown("normal");
                    this.showForm = !this.showForm;
                }
                this.message = message;
            }
        );
        this.messageService.switchMessageFormEvent.subscribe(
            (evt: string) => {
                if(this.showForm) {
                    $('.message-input').slideDown("normal");
                }else {
                    this.myForm.reset();
                    this.message = null;
                    $('.message-input').slideUp("normal");
                }
                this.showForm = !this.showForm;
            }
        );
    }
}