const viewsControllers = {
    home: (req, res) => {
        res.render("index", {
            title: "Home",
            userLogIn: req.session.userLogIn
        })
    },
}
module.exports = viewsControllers