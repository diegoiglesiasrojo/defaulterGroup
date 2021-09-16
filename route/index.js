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

router.route("/users")
.post(userControllers.createUser)
.get(userControllers.readAllUsers)

router.route("/users/:id")
.get(userControllers.readUserById)
.put(userControllers.updateUserById)
.delete(userControllers.deleteUserById)

router.route("/debtsList")
.post(debtControllers.createDebt)
.get(debtControllers.debtsList)

router.route("/debtsList/:id")
.post(debtControllers.updateDebtById)
.get(debtControllers.deleteDebtById)

module.exports = router