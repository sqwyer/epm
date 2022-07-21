import { HydratedDocument } from "mongoose";
import { User as UserType } from '../models/types'
import { User as UserModel } from '../models/User'
// import { Authorized } from "./Authorized";

class User {
    public static find(id: string): Promise<HydratedDocument<UserType>> {
        return new Promise((resolve: Function, reject: Function) => {
            UserModel.findOne({id}, (err: any, user: HydratedDocument<UserType>) => {
                if(err) reject(err)
                else if(!user) reject(new Error('No user with that ID.'))
                else resolve(user)
            })
        })
    }
}

export { User }