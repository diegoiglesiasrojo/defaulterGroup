const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")
const debtControllers = require("../controllers/debtControllers")
const viewsControllers = require("../controllers/viewsControllers")
const validator = require("../controllers/validator")

router.route("/")
.get(viewsControllers.home)

router.route("/users/signUp")
.get(userControllers.signUpView)
.post(validator, userControllers.createUser)

router.route("/users/signIn")
.get(userControllers.signInView)
.post(userControllers.signIn)

router.route("/users/logOut")
.get(userControllers.logOut)

router.route("/users/:id")
.post(userControllers.updateUserById)
.get(userControllers.deleteUserById)

router.route("/debtsList")
.post(debtControllers.createDebt)
.get(debtControllers.debtsList)

router.route("/debtsList/:id")
.post(debtControllers.updateDebtById)
.get(debtControllers.deleteDebtById)

module.exports = router