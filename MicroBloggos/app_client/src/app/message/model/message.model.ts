export class Message {
    constructor(public content:String,
                public username:String,
                public messageId?:String,
                public userId?:String){
    }
}