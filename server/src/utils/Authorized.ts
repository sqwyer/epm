import { User } from "../models/User";
import { User as UserType } from '../models/types';
import { HydratedDocument } from "mongoose";

class Authorized {
    public user: HydratedDocument<UserType>;
    /**
     * 
     * @param {string} id Google ID
     * @returns Promise
     * @example
     * router.post('/', (req, res) => {
     *  const auth = new Project()
     *  project.setUser(req.user.id)
     *  project.rename.asUser('My Cool Project')
     *    .then(() => res.json({message: 'Done'}))
     *    .catch(() => res.json({error: 'No permission'}))
     * })
     */
    async setUser(id: string) {
        return new Promise(async (resolve: Function, reject: Function) => {
            await User.findOne({id}, (err: any, user: HydratedDocument<UserType>) => {
                if(err) {
                    console.error(err);
                    reject(err);
                } else if(user) {
                    this.user = user;
                    resolve(user);
                } else reject('User does not exist.')
            })
        })
    }
}

export { Authorized }