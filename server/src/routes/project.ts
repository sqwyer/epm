import { Router, Request, Response } from "express"
import { HydratedDocument } from "mongoose"
import { protect } from "../middleware/protected"
import { ProjectModel, ProjectType } from "../models/Project"
import { UserModel } from "../models/User"
import { userHasPermission } from "../utils/userHasPermission"

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
    } else {
        res.redirect("/")
    }
})

ProjectRouter.get(
    "/:id/settings",
    protect,
    async (req: Request, res: Response) => {
        const project = await GetProject(req, res)
        if (project) {
            if (userHasPermission(req.user.id, project, "manage_settings")) {
                res.render("project/settings", {
                    user: req.user,
                    project,
                })
            } else res.redirect(`/project/${project.id}`)
        } else {
            res.redirect("/")
        }
    }
)

ProjectRouter.get(
    "/:id/members",
    protect,
    async (req: Request, res: Response) => {
        const project = await GetProject(req, res)
        if (project) {
            const members = []
            for (let i = 0; i < project.members.length; i++) {
                try {
                    const user = await UserModel.findOne({
                        id: project.members[i].id,
                    })
                    const member = project.members.find(
                        (self) => self.id == user.id
                    )
                    const role = project.roles.find((self) =>
                        self.id.equals(member.role)
                    )
                    user.role = role
                    members.push(user)
                } catch (err) {
                    console.error(err)
                }
            }
            res.render("project/members", {
                user: req.user,
                project,
                members,
                canModify: userHasPermission(
                    req.user.id,
                    project,
                    "manage_members"
                ),
            })
        } else {
            res.redirect("/")
        }
    }
)

export { ProjectRouter, GetProject }
