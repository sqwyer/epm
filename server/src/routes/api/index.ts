import { Router, Request, Response } from "express"
import { HydratedDocument } from "mongoose"
import { APICreateRouter } from "./create"
import { ProjectModel, ProjectType } from "../../models/Project"
import { protect } from "../../middleware/protected"
import { userHasPermission } from "../../utils/userHasPermission"
import { APIProjectRouter } from "./project"
import { APIUserRouter } from "./user"

const APIRouter = Router()

APIRouter.use("/create", APICreateRouter)
APIRouter.use("/project", APIProjectRouter)
APIRouter.use("/user", APIUserRouter)

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
