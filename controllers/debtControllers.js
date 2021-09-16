const Debt = require("../models/Debt")

const debtControllers = {
    debtsList: async (req, res) => {
        const debtList = await Debt.find()
        res.render("debtsList", {
            title: "debts List",
            debtList,
            error: null
        })
    },

    createDebt: async (req, res) => {
        const {userId, debtor, debt, isUSD} = req.body
        const DebtToCreate = await new Debt({
            userId, debtor, debt, isUSD
        })
        DebtToCreate.save()
        .then(() => {
            res.redirect("/debtsList")
        })
        .catch( async e => {
            const debtList = await Debt.find()
            res.render("debtsList", {
                title: "debts List",
                debtList,
                error: e
            })    
        })
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