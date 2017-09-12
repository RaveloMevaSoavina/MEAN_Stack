export class User {
    constructor(
                public email:String,
                public username?:String,
                public password?: String,
                public _id?:String,
                public messagesId?: Array<String>,
                public createdAt?:Date,
                public updatedAt?:Date     
            ){

    }
}