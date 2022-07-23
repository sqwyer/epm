import * as passport from "passport"
import { Strategy } from "passport-google-oauth2"
import { User } from "./models/User"

if (process.env.NODE_ENV != "production") require("dotenv").config()

passport.use(
    new Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CLIENT_REDIRECT,
            passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
            User.findOne({ id: profile.id }, function (err, user) {
                if (err) done(`Failed while finding user: ${err}`, null)
                else if (!user) {
                    let newUser = new User({
                        id: profile.id,
                        displayName: profile.displayName,
                        email: profile.email,
                        emails: profile.emails,
                        picture: profile.picture,
                        projects: [],
                    })
                    newUser.save((err2) => {
                        if (err2) done(`Failed to save user: ${err2}`, null)
                        else done(null, newUser)
                    })
                } else done(null, user)
            })
        }
    )
)

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})
