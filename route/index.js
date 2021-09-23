const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")
const debtControllers = require("../controllers/debtControllers")
const viewsControllers = require("../controllers/viewsControllers")
const verifyRoutes = require("../controllers/verifyRoutes")
const validator = require("../controllers/validator")
const validatorToModify = require("../controllers/validatorToModify")

router.route("/")
.get(verifyRoutes.isLogOut, viewsControllers.home)

router.route("/users/signUp")
.get(verifyRoutes.isLogOut, userControllers.signUpView)
.post(verifyRoutes.isLogOut, validator, userControllers.createUser)

router.route("/users/signIn")
.get(verifyRoutes.isLogOut, userControllers.signInView)
.post(verifyRoutes.isLogOut, userControllers.signIn)

router.route("/users/logOut")
.get(verifyRoutes.isLogIn, userControllers.logOut)

router.route("/users/settings")
.get(verifyRoutes.isLogIn, userControllers.settingsView)

router.route("/users/settings/:id")
.post(verifyRoutes.isLogIn, validatorToModify, userControllers.updateUserById)

router.route("/users/expenseDivider")
.get(verifyRoutes.isLogIn, userControllers.expenseDivider)

router.route("/users/:id")
.get(verifyRoutes.isLogIn, userControllers.deleteUserById)

router.route("/debtsList")
.post(verifyRoutes.isLogIn, debtControllers.createDebt)
.get(verifyRoutes.isLogIn, debtControllers.debtsList)

router.route("/debtsList/editDebt/:id")
.get(verifyRoutes.isLogIn, debtControllers.updateDebtView)
.post(verifyRoutes.isLogIn, debtControllers.updateDebtById)

router.route("/debtsList/deleteDebt/:id")
.get(verifyRoutes.isLogIn, debtControllers.deleteDebtById)

module.exports = router