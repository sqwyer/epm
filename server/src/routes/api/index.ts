import { Router, Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'

import { Project } from '../../lib/project'
import { APICreateRouter } from './create'
import { Project as ProjectType } from '../../models/types'

const APIRouter = Router()

APIRouter.use('/create', APICreateRouter)

APIRouter.get('/getproject', async (req: Request, res: Response) => {
    if(req.query.id) {
        await Project.find(req.query.id)
            .then((project: HydratedDocument<ProjectType>) => {
                res.json({status: 'success', project})
            })
            .catch(error => {res.json({status: 'error', error})})
    } else {
        res.json({status: 'error', error: 'Missing query parameter "id"'})
    }
})

export { APIRouter }