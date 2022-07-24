import { HydratedDocument } from "mongoose"
import { UserModel, UserType } from "../models/User"
import { ProjectModel, ProjectType } from "../models/Project"

// type GetAllField = 'projects'|'pending_projects'

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

    public static async getInvites(id: string): Promise<ProjectType[]> {
        return new Promise((resolve: Function, reject: Function) => {
            UserModel.findOne(
                { id },
                async (err: any, user: HydratedDocument<UserType>) => {
                    if (err) reject(err)
                    else if (!user) reject(new Error("No user with that ID."))
                    else {
                        const invites = []
                        for (let i = 0; i < user.pending_projects.length; i++) {
                            try {
                                const invite: HydratedDocument<ProjectType> =
                                    await ProjectModel.findById(
                                        user.pending_projects[i]
                                    ).exec()
                                invites.push(invite)
                            } catch (err) {
                                console.error(err)
                            }
                        }
                        resolve(invites)
                    }
                }
            )
        })
    }

    // public static async getAll(id: string, field: GetAllField[])
}

export { User }
