const Debt = require("../models/Debt")

const debtControllers = {
    debtsList: async (req, res) => {
        const debtList = await Debt.find({userId: req.session.userId})
        res.render("debtsList", {
            title: "debts List",
            debtList,
            error: null,
            userLogIn: req.session.userLogIn,
            userId: req.session.userId,
            userPhoto: req.session.userPhoto
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
                userId: req.session.userId,
                userPhoto: req.session.userPhoto
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
                    userId: req.session.userId,
                    userPhoto: req.session.userPhoto
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
                userId: req.session.userId,
                userPhoto: req.session.userPhoto
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
                userId: req.session.userId,
                userPhoto: req.session.userPhoto
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
                userId: req.session.userId,
                userPhoto: req.session.userPhoto
            })
        })
    },

    expenseDividerView: (req, res) => {
        res.render("expenseDivider", {
            title: "expense divider",
            error: null,
            countOfPeople: 2,
            expenseData: null,
            userId: req.session.userId,
            userLogIn: req.session.userLogIn,
            userPhoto: req.session.userPhoto
        })
    },

    expenseDividerWithCount: (req, res) => {
        if (req.params.countOfPeople > 1) {
            console.log(req.query)
            res.render("expenseDivider", {
                title: "expense divider",
                error: null,
                countOfPeople: req.params.countOfPeople,
                expenseData: null,
                userId: req.session.userId,
                userLogIn: req.session.userLogIn,
                userPhoto: req.session.userPhoto
            })
        } else {
            res.redirect("/expenseDivider")
        }
    },

    expenseDivider: async (req, res) => {
        const {totalCost, isUSD, people} = req.body
        for (let i = 0; i < people.length; i++) {
            const debtToCreate = await new Debt({
                userId: req.session.userId, debtor: people[i], debt: (totalCost/people.length).toFixed(2), isUSD
            })
            debtToCreate.save()
            .catch( async e => {
                const debtList = await Debt.find({_id: req.session.userId})
                res.render("debtsList", {
                    title: "debts List",
                    debtList,
                    error: e,
                    userLogIn: req.session.userLogIn,
                    userId: req.session.userId,
                    userPhoto: req.session.userPhoto
                })
            })
        }
        res.redirect("/debtsList")
    }
}

module.exports = debtControllers