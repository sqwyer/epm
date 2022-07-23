import * as express from "express"
import * as session from "express-session"
import * as passport from "passport"
import * as hbs from "hbs"
import { protect } from "./middleware/protected"
import { GoogleRouter } from "./routes/google"
import { DevRouter } from "./dev/index"
import { CreateRouter } from "./routes/create"
import { APIRouter } from "./routes/api/index"
import { ProjectRouter } from "./routes/project"
import { User } from "./lib/user"

if (process.env.NODE_ENV != "production") require("dotenv").config()
const PORT = Number(process.env.PORT) || 3000

const app = express()

require("./auth")
require("./hbs")

const cwd = process.cwd()

const pInit = passport.initialize.bind(passport)
const pSession = passport.session.bind(passport)

hbs.registerPartials(`${cwd}/views/partials`)

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
)
app.use(pInit())
app.use(pSession())
app.set("view engine", "hbs")
app.set("views", `${cwd}/views/pages`)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(GoogleRouter)
app.use("/api", APIRouter)
app.use("/create", CreateRouter)
app.use("/project", ProjectRouter)

if (process.env.NODE_ENV != "production")
    app.use("/css", express.static(`${cwd}/public/_css`))
else app.use("/css", express.static(`${cwd}/public/css`))

app.use("/js", express.static(`${cwd}/public/dist`))
app.use("/static", express.static(`${cwd}/public/static`))

if (process.env.NODE_ENV != "production") app.use(DevRouter)

app.get("/", protect, async (req, res) => {
    await User.getProjects(req.user.id)
        .then((projects) => {
            res.render("dashboard", { user: req.user, projects })
        })
        .catch((err) => {
            console.error(err)
            res.render("dashboard", { user: req.user, projects: [] })
        })
})

app.post("/auth/logout", (req, res) => {
    req.logout((err) => {
        if (err) res.redirect("/?err=Failed to log out.")
        else res.redirect("/auth/google")
    })
})

app.listen(PORT, () => {
    console.log("Running on PORT:" + PORT)
})
