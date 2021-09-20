const Debt = require("../models/Debt")

const debtControllers = {
    debtsList: async (req, res) => {
        const debtList = await Debt.find({userId: req.session.userId})
        res.render("debtsList", {
            title: "debts List",
            debtList,
            error: null,
            userLogIn: req.session.userLogIn,
            userId: req.session.userId
        })
    },

    createDebt: async (req, res) => {
        const {debtor, debt, isUSD} = req.body
        const debtToCreate = await new Debt({
            userId: req.session.userId, debtor, debt, isUSD
        })
        debtToCreate.save()
        .then(() => {
            res.redirect("/debtsList")
        })
        .catch( async e => {
            const debtList = await Debt.find({_id: req.session.userId})
            res.render("debtsList", {
                title: "debts List",
                debtList,
                error: e,
                userLogIn: req.session.userLogIn,
                userId: req.session.userId
            })
        })
    },

    updateDebtView: async (req, res) => {
        Debt.findOne({_id: req.params.id})
        .then(debt => {
            if(debt) {
                res.render("editDebt", {
                    title: "Edit debt",
                    userLogIn: req.session.userLogIn,
                    debt,
                    error: null,
                    userId: req.session.userId
                })
            } else {
                throw new Error
            }
        })
        .catch( async e => {
            console.log(req.session.userId)
            const debtList = await Debt.find({_id: req.session.userId})
            res.render("debtsList", {
                title: "debts List",
                debtList,
                error: e,
                userLogIn: req.session.userLogIn,
                userId: req.session.userId
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
            const debtList = await Debt.find({_id: req.session.userId})
            res.render("debtsList", {
                title: "debts List",
                debtList,
                error: e,
                userLogIn: req.session.userLogIn,
                userId: req.session.userId
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
            const debtList = await Debt.find({_id: req.session.userId})
            res.render("debtsList", {
                title: "debts List",
                debtList,
                error: e,
                userLogIn: req.session.userLogIn,
                userId: req.session.userId
            })
        })
    }
}

module.exports = debtControllers