import { Router, Request, Response } from "express"
import { HydratedDocument, Types } from "mongoose"
import { APICreateRouter } from "./create"
import { Permission, ProjectModel, ProjectType } from "../../models/Project"
import { protect } from "../../middleware/protected"

const APIRouter = Router()

APIRouter.use("/create", APICreateRouter)

function userHasPermission(
    user: string,
    project: ProjectType,
    permission: Permission
) {
    const member = project.members.find((self) => self.id == user)
    if (!member) return false
    else if (member.id == project.owner) return true
    else {
        const role = project.roles.find((self) => self.id == member.role)

        if (!role) return false
        else if (role.permissions.includes(permission)) return true
        else if (role.permissions.includes("*")) return true
        else return false
    }
}

APIRouter.get("/getproject", async (req: Request, res: Response) => {
    if (req.query.id) {
        try {
            const project: HydratedDocument<ProjectType> =
                await ProjectModel.findById(req.query.id).exec()
            res.json({ status: "success", project })
        } catch (error) {
            res.json({ status: "error", error })
        }
    } else {
        res.json({ status: "error", error: 'Missing query parameter "id"' })
    }
})

APIRouter.post(
    "/updateproject",
    protect,
    async (req: Request, res: Response) => {
        if (req.query.id) {
            try {
                const project: HydratedDocument<ProjectType> =
                    await ProjectModel.findById(req.query.id).exec()

                if (
                    userHasPermission(req.user.id, project, "manage_settings")
                ) {
                    for (let key in req.body) {
                        project[key] = req.body[key]
                        project.markModified(key)
                    }

                    project.save((error) => {
                        if (error)
                            res.json({
                                status: "error",
                                error: "Error saving to database",
                            })
                        else res.json({ status: "success", project })
                    })
                } else {
                    res.json({ status: "error", error: "No permission" })
                }
            } catch (error) {
                res.json({ status: "error", error: "Error saving to database" })
                console.error(error)
            }
        }
    }
)

export { APIRouter }
