import { Document, Types } from "mongoose";
import { Project as ProjectType } from '../models/types'
import { Project as ProjectModel } from '../models/Project'
import { Authorized } from "./Authorized";

type pid = Types.ObjectId

class Project extends Authorized {

    public id: pid;
    public doc: Document<ProjectType>;

    constructor(id: pid) {
        super();
        this.id = id;
        this.reloadDoc();
    }

    async reloadDoc() {
        await ProjectModel.findOne({id: this.id}, (err: any, project: Document<ProjectType>) => {
            if(err) { throw err }
            else if(project) { this.doc = project }
            else throw new Error('Project does not exist')
        })
    }

    async rename() {

    }

    static async find(id: pid) {
        return new Promise((resolve: Function, reject: Function) => {
            ProjectModel.findOne({id}, (err: any, project: Document<ProjectType>) => {
                if(err) { reject(err) }
                else if(project) { resolve(project) }
                else reject('Project does not exist')
            })
        })
    }
}

/*
ex, api.js

get('/:id', (req: res) => {
    const project = new Project(req.params.id)
    project.setUser(req.user.id)
})


*/

export { Project }