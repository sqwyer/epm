import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { Project } from '../../lib/project';
import { protect } from '../../middleware/protected';

const ProjectRouter = Router();

ProjectRouter.get('/:id/', protect, async (req: Request, res: Response) => {
    if(Types.ObjectId.isValid(req.params.id))
        await Project.find(new Types.ObjectId(req.params.id))
            .then(project => {
                res.render('project', {
                    user: req.user,
                    project
                })
            }).catch(err => {
                res.render('error', { user: req.user, err: {header: 'An Error Occured!', msg: 'The requested project could not be loaded.'}})
                console.error(err)
            })
    else res.render('error', { user: req.user, err: {header: 'An Error Occured!', msg: 'The requested project could not be loaded.'}})
})

export { ProjectRouter }