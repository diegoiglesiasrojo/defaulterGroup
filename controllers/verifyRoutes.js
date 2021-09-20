const verifyRoutes = {
    isLogIn: (req, res, next) => {
        if (req.session.userLogIn) {
            next()
        } else {
            res.redirect("/")
        }
    },

    isLogOut: (req, res, next) => {
        if (!req.session.userLogIn) {
            next()
        } else {
            res.redirect("/debtsList")
        }
    }
}

module.exports = verifyRoutes