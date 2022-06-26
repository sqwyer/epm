import { Router } from 'express';
import * as passport from 'passport';

const authenticate = passport.authenticate.bind(passport);

const GoogleRouter = Router();

GoogleRouter.get('/auth/google', authenticate('google', { scope: ['email', 'profile'] }));
GoogleRouter.get('/auth/google/callback', authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/google/failure'
}));
GoogleRouter.get('/auth/google/failure', (req, res) => {
    res.render('../auth/fail')
});

export { GoogleRouter }