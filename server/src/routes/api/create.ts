import { Router, Request, Response } from 'express';
import { objectContainsAll } from '../../lib/containsAll';
// import { Project } from '../../lib/project';
import { protect } from '../../middleware/protected';

const APICreateRouter = Router();

const REQUIRED_FIELDS = ['owner', 'name']

APICreateRouter.post('/project', protect, (req: Request, res: Response) => {
    if(objectContainsAll(req.body, REQUIRED_FIELDS)) {
        res.json({
            status: 'success'
        })
        console.log('success')
    } else {
        res.json({
            status: 'error',
            error: 'Missing required values "owner" or "name".'
        })
        console.log('error')
    }
})

export { APICreateRouter }