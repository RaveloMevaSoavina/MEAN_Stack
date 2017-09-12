import { FlashService } from './flash.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Error } from "./error.model";
@Component({
    selector: 'app-flash',
    templateUrl: './flash.component.html',
    styles: [`
           .backdrop{
                background-color: rgba(0,0,0,0.6);
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
            }
        `]
})
export class FlashComponent implements OnInit{
    error: Error;
    displayed = 'none';

    constructor(private errorService:FlashService){}

    onErrorCloseClick(){
        this.displayed = 'none';
    }
    ngOnInit(){
        this.errorService.errorOccuredEvent.subscribe(
            (error: Error) => {
                this.error = error;
                this.displayed = 'block';
            }
        )
    }
}