import { Router, Request, Response } from "express"
import { Types, HydratedDocument } from "mongoose"
import { objectContainsAll } from "../../utils/containsAll"
import { protect } from "../../middleware/protected"
import { ProjectModel, ProjectMember, ProjectRole } from "../../models/Project"
import { UserModel, UserType } from "../../models/User"

const APICreateRouter = Router()

const REQUIRED_FIELDS = ["owner", "name"]

APICreateRouter.post("/project", protect, (req: Request, res: Response) => {
    function err(error: string, ext?: any) {
        res.json({ status: "error", error, ...ext })
    }
    console.log(req.body)
    if (objectContainsAll(req.body, REQUIRED_FIELDS)) {
        // whenever teams are added you will be able to change owner to a team
        if (req.body.owner != req.user.id)
            err("Not authorized to create a project as that owner.", {
                ctx: { owner: req.body.owner },
            })
        else {
            const manager: ProjectRole = {
                label: "Manager",
                permissions: ["*"],
                id: new Types.ObjectId(),
            }
            const member: ProjectMember = { id: req.user.id, role: manager.id }
            const project: any = new ProjectModel({
                name: req.body.name,
                members: [member],
                owner: req.body.owner,
                description: req.body.desc,
                roles: [manager],
                tasks: [],
            })

            project.save(async (error?: any) => {
                if (error) {
                    err("An error occured saving to the database.")
                    console.error(error)
                } else {
                    try {
                        const user: HydratedDocument<UserType> =
                            await UserModel.findOne({ id: req.user.id }).exec()
                        user.projects.push(project._id)
                        user.markModified("projects")
                        user.save((error?: any) => {
                            if (error) {
                                err("An error occured saving to the database.")
                                console.error(error)
                            } else {
                                res.json({
                                    status: "success",
                                    project,
                                    recommendedRedirect: `/project/${project._id.toString()}`,
                                })
                            }
                        })
                    } catch (error) {
                        err("An error occured saving to the database.")
                        console.error(error)
                    }
                }
            })
        }
    } else err('Missing required values "owner" or "name"')
})

export { APICreateRouter }
