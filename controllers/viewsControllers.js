const path = require("path")

const viewsControllers = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, "..", "views/index.html"))
    },

    signUp: (req, res) => {
        res.sendFile(path.join(__dirname, "..", "views/signUp.html"))
    },

    signIn: (req, res) => {
        res.sendFile(path.join(__dirname, "..", "views/signIn.html"))
    },

    debtsList: (req, res) => {
        res.sendFile(path.join(__dirname, "..", "views/debtsList.html"))
    }
}
module.exports = viewsControllers