const User = require("../models/User")

const userControllers = {
    readAllUsers: (req, res) => {
        res.json("todos los usuarios")
    },

    createUser: (req, res) => {
        res.json("crear un usuario")
    },

    readUserById: (req, res) => {
        res.json("obtener un usuario con la id: " + req.params.id)
    },

    updateUserById: (req, res) => {
        res.json("modificar un usuario con la id: " + req.params.id)
    },

    deleteUserById: (req, res) => {
        res.json("borrar un usuario con la id: " + req.params.id)
    }
}
module.exports = userControllers