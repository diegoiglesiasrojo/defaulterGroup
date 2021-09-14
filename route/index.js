const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")
const debtControllers = require("../controllers/debtControllers")
const viewsControllers = require("../controllers/viewsControllers")

router.route("/")
.get(viewsControllers.home)

router.route("/signUp")
.get(viewsControllers.signUp)

router.route("/signIn")
.get(viewsControllers.signIn)

router.route("/debtsList")
.get(viewsControllers.debtsList)

router.route("/users")
.post(userControllers.createUser)
.get(userControllers.readAllUsers)

router.route("/users/:id")
.get(userControllers.readUserById)
.put(userControllers.updateUserById)
.delete(userControllers.deleteUserById)

router.route("/debts")
.post(debtControllers.createDebt)
.get(debtControllers.readAllDebts)

router.route("/debts/:id")
.get(debtControllers.readDebtById)
.put(debtControllers.updateDebtById)
.delete(debtControllers.deleteDebtById)

module.exports = router