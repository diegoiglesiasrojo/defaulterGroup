const path = require("path")

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

    debtsList: (req, res) => {
        res.render("debtsList", {
            title: "debts List"
        })
    }
}
module.exports = viewsControllers