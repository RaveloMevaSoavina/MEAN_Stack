import { User } from './../../user/model/user.model';
export class Message {
    constructor(public description:String,
                public user?:User,
                public _id?:String,
                public createdAt?:Date,
                public updatedAt?:Date                
            ){
    }
}