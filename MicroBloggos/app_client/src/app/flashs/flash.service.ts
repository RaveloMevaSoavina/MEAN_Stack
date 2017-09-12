import { Error } from './error.model';
import { Flash } from './flash.model';
import { EventEmitter } from '@angular/core';
export class FlashService{
    errorOccuredEvent = new EventEmitter<Error>();

    handleError(error:any){
        const errorData = new Error(error.title, error.message);
        this.errorOccuredEvent.emit(errorData);
    }

    handleFlash(flash:any){
        const errorData = new Flash(flash.title, flash.message);
        this.errorOccuredEvent.emit(errorData);
    }
}