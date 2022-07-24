import { Router, Request, Response } from 'express'
import { protect } from '../../middleware/protected'
import { GetProject } from '../project'
import { UserModel } from '../../models/User'

const UserRouter = Router()

UserRouter.post('/invite/accept/:id', protect, async (req: Request, res: Response) => {
    const project = await GetProject(req, res);
    if(project) {
        if(req.body.email) {
            try {
                const user = await UserModel.findOne({email: req.body.email});
                if(user) {
                    const invite = project.pending_members.find(self => self.id == user.id);
                    if(invite) {
                        project.pending_members.splice(project.pending_members.indexOf(invite, 1));
                        user.pending_projects.splice(user.pending_projects.indexOf(project.id, 1));
                        project.members.push({
                            id: user.id,
                            role: invite.role
                        })
                        user.projects.push(project.id)

                        project.markModified('pending_members')
                        project.markModified('members')
                        user.markModified('pending_projects')
                        user.markModified('projects')

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
                    else {
                        user.pending_projects.splice(user.pending_projects.indexOf(project.id, 1));
                        res.json({
                            status: 'error',
                            error: 'You don\'t have an invitation from that project'
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
                error: 'Missing "email" field in request body'
            })
        }
    } else {
        res.json({
            status: 'error',
            error: 'Project does not exist'
        })
    }
})

UserRouter.post('/invite/deny/:id', protect, async (req: Request, res: Response) => {
    const project = await GetProject(req, res);
    if(project) {
        if(req.body.email) {
            try {
                const user = await UserModel.findOne({email: req.body.email});
                if(user) {
                    if(!project.pending_members.includes(user.id)) {
                        user.pending_projects.splice(user.pending_projects.indexOf(project.id, 1));
                        res.json({
                            status: 'error',
                            error: 'You don\'t have an invitation from that project'
                        })
                    } else {
                        project.pending_members.splice(project.pending_members.indexOf(user.id, 1));
                        user.pending_projects.splice(user.pending_projects.indexOf(project.id, 1));
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
                error: 'Missing "email" field in request body'
            })
        }
    } else {
        res.json({
            status: 'error',
            error: 'Project does not exist'
        })
    }
})

export { UserRouter }