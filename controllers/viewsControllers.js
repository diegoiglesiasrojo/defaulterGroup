const viewsControllers = {
    home: (req, res) => {
        res.render("index", {
            title: "Home",
            userLogIn: req.session.userLogIn,
            userPhoto: req.session.userPhoto
        })
    },
}
module.exports = viewsControllers