import { Router, Request, Response } from "express"
import { HydratedDocument } from "mongoose"
import { protect } from "../middleware/protected"
import { ProjectModel, ProjectType } from "../models/Project"

const ProjectRouter = Router()

async function GetProject(req: Request, res: Response) {
    try {
        const project: HydratedDocument<ProjectType> =
            await ProjectModel.findById(req.params.id).exec()
        return project
    } catch (err) {
        res.render("error", {
            user: req.user,
            err: {
                header: "An Error Occured!",
                msg: "The requested project could not be loaded.",
            },
        })
    }
}

ProjectRouter.get("/:id/", protect, async (req: Request, res: Response) => {
    const project = await GetProject(req, res)
    if (project) {
        res.render("project", {
            user: req.user,
            project,
        })
    }
})

ProjectRouter.get(
    "/:id/settings",
    protect,
    async (req: Request, res: Response) => {
        const project = await GetProject(req, res)
        if (project) {
            res.render("project/settings", {
                user: req.user,
                project,
            })
        }
    }
)

export { ProjectRouter }
