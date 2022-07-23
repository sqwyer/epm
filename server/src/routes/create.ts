import { Router, Request, Response } from "express"
import { protect } from "../middleware/protected"

const CreateRouter = Router()

CreateRouter.get("/project", protect, (req: Request, res: Response) => {
    res.render("create_project", { user: req.user })
})

export { CreateRouter }
