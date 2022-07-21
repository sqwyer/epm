import { Router } from 'express';
import { APICreateRouter } from './create';

const APIRouter = Router();

APIRouter.use('/create', APICreateRouter)

export { APIRouter }