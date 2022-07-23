import { Router, Request, Response } from "express"
import { HydratedDocument } from "mongoose"
import { protect } from "../middleware/protected"
import { ProjectModel, ProjectType } from "../models/Project"

const ProjectRouter = Router()

ProjectRouter.get("/:id/", protect, async (req: Request, res: Response) => {
    try {
        const project: HydratedDocument<ProjectType> = await ProjectModel.findById(
            req.params.id
        ).exec()
        res.render("project", {
            user: req.user,
            project,
        })
    } catch (err) {
        res.render("error", {
            user: req.user,
            err: {
                header: "An Error Occured!",
                msg: "The requested project could not be loaded.",
            },
        })
        console.error(err)
    }
})

export { ProjectRouter }
