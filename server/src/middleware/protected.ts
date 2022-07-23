function protect(req, res, next) {
    if (req.user) next()
    else res.redirect("/auth/google")
}

export { protect }