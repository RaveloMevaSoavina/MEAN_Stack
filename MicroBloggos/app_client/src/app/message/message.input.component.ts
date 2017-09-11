import { Component, OnInit } from "@angular/core";
import { Message } from './model/message.model';
import { MessageService } from './service/message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-message-input',
    templateUrl: './views/message.input.component.html',
    styleUrls: ['./views/message.input.component.css']    
})
export class MessageInputComponent{
    myForm:FormGroup;
    constructor(private messageService:MessageService){}

    onSubmit(){
        const message = new Message(this.myForm.value.message, "Adel");
        this.messageService.addMessage(message);
        this.myForm.reset();
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            message: new FormControl(null,  [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(140)
            ]),
        });
    }
}