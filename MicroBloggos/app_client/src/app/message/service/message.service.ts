import { Flash } from './../../flashs/flash.model';
import { FlashService } from './../../flashs/flash.service';
import { Message } from "../model/message.model";
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from 'rxjs'

@Injectable()
export class MessageService {

    private messages: Message[] = [];
    switchMessageFormEvent = new EventEmitter<string>();
    messageEditEvent = new EventEmitter<Message>();
    constructor(private http: Http, private flashService:FlashService) { }
    my_headers = new Headers({ 'Content-type': 'application/json' });

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        var token:String = '';
        if(localStorage.getItem('token')){
            token = '?token=' + localStorage.getItem('token');
        }
        return this.http.post('http://127.0.0.1:3000/messages'+token, body, { headers: this.my_headers })
            .map((response: Response) => {
                const result = response.json();
                message = new Message(result.obj.description, result.obj.user, result.obj._id, result.obj.createdAt, result.obj.updatedAt);    
                this.messages.push(message);
                this.flashService.handleFlash(new Flash('message', 'Message added successfully !'));                
                return message;
            })
            .catch((error: Response) => {
                this.flashService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getMessages() {
        return this.http.get('http://127.0.0.1:3000/messages')
            .map((response: Response) => {
                const messages = response.json();
                let arr: Message[] = [];
                for (let obj of messages) {
                    let message = new Message(
                        obj.description,
                        obj.user,
                        obj._id,
                        new Date(obj.createdAt),
                        new Date(obj.updatedAt)
                    );
                    arr.push(message);
                }
                this.messages = arr;
                return arr;
            })
            .catch((error: Response) => {
                this.flashService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateMessage(message: Message){
        const body = JSON.stringify(message);
        var token:String = '';
        if(localStorage.getItem('token')){
            token = '?token=' + localStorage.getItem('token');
        }
        return this.http.patch('http://127.0.0.1:3000/messages/' + message._id + token, body, { headers: this.my_headers })
            .map((response: Response) => {
                this.flashService.handleFlash(new Flash('message', 'Message updated successfully !'));  
                return response.json();
            })
            .catch((error: Response) => {
                this.flashService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    switchMessageForm() {
        this.switchMessageFormEvent.emit("switch message form");
    }
    editMessage(message: Message) {
        this.messageEditEvent.emit(message);
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        var token:String = '';
        if(localStorage.getItem('token')){
            token = '?token=' + localStorage.getItem('token');
        }
        return this.http.delete('http://127.0.0.1:3000/messages/' + message._id + token)
            .map((response: Response) => {
                this.flashService.handleFlash(new Flash('message', 'Message deleted successfully !'));  
            })
            .catch((error: Response) => {
                this.flashService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}