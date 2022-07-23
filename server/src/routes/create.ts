import { Router, Request, Response } from "express"
import { protect } from "../middleware/protected"
import { User } from "../utils/user"

const CreateRouter = Router()

CreateRouter.get("/project", protect, async (req: Request, res: Response) => {
    await User.getProjects(req.user.id)
        .then((projects) => {
            res.render("create_project", { user: req.user, projects })
        })
        .catch((err) => {
            res.render("create_project", { user: req.user, projects: [] })
            console.error(err)
        })
})

export { CreateRouter }
