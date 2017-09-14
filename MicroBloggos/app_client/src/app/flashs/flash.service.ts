import { Error } from './error.model';
import { Flash } from './flash.model';
import { EventEmitter } from '@angular/core';
export class FlashService{
    errorOccuredEvent = new EventEmitter<Error>();
    flashOccuredEvent = new EventEmitter<Flash>();
    

    handleError(error:any){
        const errorData = new Error(error.title, error.message);
        this.errorOccuredEvent.emit(errorData);
    }

    handleFlash(flash:any){
        const flashData = new Flash(flash.title, flash.message);
        this.flashOccuredEvent.emit(flashData);
    }
}