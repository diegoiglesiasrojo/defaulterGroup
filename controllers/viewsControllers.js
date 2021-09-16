const viewsControllers = {
    home: (req, res) => {
        res.render("index", {
            title: "Home"
        })
    },

    signUp: (req, res) => {
        res.render("signUp", {
            title: "sign Up"
        })
    },

    signIn: (req, res) => {
        res.render("signIn", {
            title: "sign In"
        })
    },
}
module.exports = viewsControllers