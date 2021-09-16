const Debt = require("../models/Debt")

const debtControllers = {
    debtsList: async (req, res) => {
        const debtList = await Debt.find()
        res.render("debtsList", {
            title: "debts List",
            debtList,
            error: null,
            userLogIn: req.session.userLogIn
        })
    },

    createDebt: async (req, res) => {
        const {userId, debtor, debt, isUSD} = req.body
        const debtToCreate = await new Debt({
            userId, debtor, debt, isUSD
        })
        debtToCreate.save()
        .then(() => {
            res.redirect("/debtsList")
        })
        .catch( async e => {
            const debtList = await Debt.find()
            res.render("debtsList", {
                title: "debts List",
                debtList,
                error: e,
                userLogIn: req.session.userLogIn
            })    
        })
    },

    updateDebtById: (req, res) => {
        Debt.findOneAndUpdate({_id: req.params.id}, {...req.body})
        .then(debt => {
            if(debt) {
                res.redirect("/debtsList")
            } else {
                throw new Error
            }
        })
        .catch(async e => {
            const debtList = await Debt.find()
            res.render("debtsList", {
                title: "debts List",
                debtList,
                error: e,
                userLogIn: req.session.userLogIn
            })
        })
    },

    deleteDebtById: (req, res) => {
        Debt.findOneAndDelete({_id: req.params.id})
        .then(debt => {
            if(debt) {
                res.redirect("/debtsList")
            } else {
                throw new Error
            }
        })
        .catch(async e => {
            const debtList = await Debt.find()
            res.render("debtsList", {
                title: "debts List",
                debtList,
                error: e,
                userLogIn: req.session.userLogIn
            })
        })
    }
}

module.exports = debtControllers