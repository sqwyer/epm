import { HydratedDocument } from "mongoose"
import { UserModel, UserType } from "../models/User"
import { ProjectModel, ProjectType } from "../models/Project"
// import { Authorized } from "./Authorized";

class User {
    public static async getProjects(id: string): Promise<ProjectType[]> {
        return new Promise((resolve: Function, reject: Function) => {
            UserModel.findOne(
                { id },
                async (err: any, user: HydratedDocument<UserType>) => {
                    if (err) reject(err)
                    else if (!user) reject(new Error("No user with that ID."))
                    else {
                        const projects = []
                        for (let i = 0; i < user.projects.length; i++) {
                            try {
                                const project: HydratedDocument<ProjectType> =
                                    await ProjectModel.findById(
                                        user.projects[i]
                                    ).exec()
                                projects.push(project)
                            } catch (err) {
                                console.error(err)
                            }
                        }
                        resolve(projects)
                    }
                }
            )
        })
    }
}

export { User }
