export class Message {
    constructor(public description:String,
                public user:String,
                public _id?:String,
                public createdAt?:Date,
                public updatedAt?:Date                
            ){
    }
}