import { Router, Request, Response } from "express"
import { HydratedDocument } from "mongoose"
import { protect } from "../middleware/protected"
import { Project } from "../models/Project"
import { Project as ProjectType } from "../models/types"

const ProjectRouter = Router()

ProjectRouter.get("/:id/", protect, async (req: Request, res: Response) => {
    try {
        const project: HydratedDocument<ProjectType> = await Project.findById(
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
