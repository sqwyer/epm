import { HydratedDocument, Types } from "mongoose"
import { ProjectModel, ProjectType } from "../models/Project"

type pid = Types.ObjectId

class Project {
    public static find(id: pid): Promise<HydratedDocument<ProjectType>> {
        return new Promise(async (resolve: Function, reject: Function) => {
            await ProjectModel.findById(
                id,
                (err: any, project: HydratedDocument<ProjectType>) => {
                    if (err) reject(err)
                    else if (!project)
                        reject(new Error("No project with that ID."))
                    else resolve(project)
                }
            )
        })
    }
}

export { Project }
