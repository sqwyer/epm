import { Router, Request, Response } from 'express'
import { protect } from '../../middleware/protected'
import { GetProject } from '../project'
import { userHasPermission } from '../../utils/userHasPermission'
import { UserModel } from '../../models/User'
import { Types } from 'mongoose'

const ProjectRouter = Router()

ProjectRouter.post('/:id/invite/send', protect, async (req: Request, res: Response) => {
    const project = await GetProject(req, res);
    if(project) {
        if (userHasPermission(req.user.id, project, "manage_members")) {
            if(req.body.email && req.body.role) {
                try {
                    const user = await UserModel.findOne({email: req.body.email});
                    if(user) {
                        if(project.pending_members.find(self => self.id == user.id)) {
                            res.json({
                                status: 'error',
                                error: 'There is already a pending invite to that user'
                            })
                        } else {
                            project.pending_members.push({id: user.id, role: new Types.ObjectId(req.body.role)});
                            if(!user.pending_projects.includes(project._id))
                                user.pending_projects.push(project.id)
                            project.markModified('pending_members')
                            user.markModified('pending_projects')
                            project.save(err => {
                                if(err) res.json({
                                    status: 'error',
                                    error: 'Error saving to database'
                                }); else {
                                    user.save(err2 => {
                                        if(err2) res.json({
                                            status: 'error',
                                            error: 'Error saving to database' 
                                        }); else res.json({
                                            status: 'success',
                                            project,
                                            user
                                        })
                                    })
                                }
                            })
                        }
                    } else {
                        res.json({
                            status: 'error',
                            error: 'User does not exist'
                        })
                    }
                } catch(err) {
                    res.json({
                        status: 'error',
                        error: 'Error finding user'
                    })
                }
            } else {
                res.json({
                    status: 'error',
                    error: 'Missing "email" or "role" field in request body'
                })
            }
        } else res.json({
            status: 'error',
            error: 'No permission'
        })
    } else {
        res.json({
            status: 'error',
            error: 'Project does not exist'
        })
    }
})

export { ProjectRouter }