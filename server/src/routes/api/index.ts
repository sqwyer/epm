import { Router, Request, Response } from "express"
import { HydratedDocument } from "mongoose"

import { APICreateRouter } from "./create"
import { Project as ProjectType } from "../../models/types"
import { Project } from "../../models/Project"

const APIRouter = Router()

APIRouter.use("/create", APICreateRouter)

APIRouter.get("/getproject", async (req: Request, res: Response) => {
    if (req.query.id) {
        try {
            const project: HydratedDocument<ProjectType> =
                await Project.findById(req.query.id).exec()
            res.json({ status: "success", project })
        } catch (error) {
            res.json({ status: "error", error })
        }
    } else {
        res.json({ status: "error", error: 'Missing query parameter "id"' })
    }
})

export { APIRouter }
