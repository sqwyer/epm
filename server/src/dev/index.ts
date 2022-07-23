import { Router } from "express"

const DevRouter = Router()

DevRouter.get("/loaded", (req, res) => {
    res.render("dashboard", {
        user: {
            id: "xxx",
            displayName: "John Doe",
            language: "en",
            email: "johndoe@gmail.com",
            emails: ["johndoe@gmail.com"],
            picture:
                "https://lh3.googleusercontent.com/ogw/ADea4I5lmHXBaXDP9tqnkFCaC5cGlBGaNwOGwnxK9CTC=s64-c-mo",
        },
        projects: [],
    })
})

export { DevRouter }
