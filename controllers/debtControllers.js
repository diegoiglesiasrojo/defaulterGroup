const Debt = require("../models/Debt")

const debtControllers = {
    readAllDebts: (req, res) => {
        res.json("todas las deudas")
    },

    createDebt: (req, res) => {
        res.json("crear una deuda")
    },

    readDebtById: (req, res) => {
        res.json("obtener una deuda de " + req.params.id)
    },

    updateDebtById: (req, res) => {
        res.json("modificar una deuda de " + req.params.id)
    },

    deleteDebtById: (req, res) => {
        res.json("borrar una deuda de " + req.params.id)
    }
}
module.exports = debtControllers