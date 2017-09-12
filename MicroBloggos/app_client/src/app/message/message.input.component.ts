import { Component, OnInit } from "@angular/core";
import { Message } from './model/message.model';
import { MessageService } from './service/message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-message-input',
    templateUrl: './views/message.input.component.html',
    styleUrls: ['./views/message.input.component.css']    
})
export class MessageInputComponent implements OnInit{ 
    myForm:FormGroup;
    message:Message;
    constructor(private messageService:MessageService){}

    onSubmit(){
        if(this.message){//message préchargé, on est en mode édition
            this.message.description = this.myForm.value.description;
            this.message.user = "59b04ecc9ca1f00cf20d0462";
            console.log(this.message);
            this.messageService.updateMessage(this.message)
                .subscribe(
                    result => console.log(result),
                    error => console.log(error)
                )
            this.message = null;
        }else{//aucun message défini, on appelle methode addmessage
            const message = new Message(this.myForm.value.description, "59b04ecc9ca1f00cf20d0462");
            this.messageService.addMessage(message)
                .subscribe(
                    data => console.log(data),
                    error => console.log(error)
                );
        }
        this.myForm.reset();
    }

    onCancel(){
        this.message = null;
        this.myForm.reset();
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            description: new FormControl(null,  [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(140)
            ]),
        });
        this.messageService.messageIsEditEvent.subscribe(
            (message: Message) => this.message = message
        );
    }
}