const User = require("../models/User")
const bcryptjs = require("bcryptjs")

const userControllers = {
    signUpView: (req, res) => {
        res.render("signUp", {
            title: "sign Up",
            error: null,
            userData: undefined,
            userLogIn: req.session.userLogIn,
            validationError: null,
            userPhoto: req.session.userPhoto
        })
    },

    createUser: async (req, res) => {
        const {firstName, lastName, password, eMail, photoURL} = req.body
        let encryptedPassword = bcryptjs.hashSync(password)
        try {
            const userToCreate = await new User({
                firstName, lastName, password: encryptedPassword, eMail, photoURL
            })
            const userExist = await User.findOne({eMail})
            if (userExist) {
                throw new Error("Mail already exist")
            } else {
                await userToCreate.save()
                req.session.userLogIn = true
                req.session.userId = userToCreate._id
                req.session.userPhoto = userToCreate.photoURL
                res.redirect("/debtsList")
            }
        } catch (e){
            res.render("signUp", {
                title: "sign Up",
                error: e.message,
                userData: {firstName, lastName, eMail, photoURL},
                userLogIn: req.session.userLogIn,
                validationError: null,
                userPhoto: req.session.userPhoto
            })
        }
    },

    signInView: (req, res) => {
        res.render("signIn", {
            title: "sign In",
            error: null,
            userData: undefined,
            userLogIn: req.session.userLogIn,
            userPhoto: req.session.userPhoto
        })
    },

    signIn: (req, res) => {
        const {eMail, password} = req.body
        User.findOne({eMail: eMail})
        .then(account => {
            if(!account) {
                throw new Error("Mail or password incorrect")
            } else {
                if(bcryptjs.compareSync(password, account.password)) {
                    req.session.userLogIn = true
                    req.session.userId = account._id
                    req.session.userPhoto = account.photoURL
                    res.redirect("/debtsList")
                } else {
                    throw new Error("Mail or password incorrect")
                }
            }
        })
        .catch(e => {
            res.render("signIn", {
                title: "sign In",
                error: e.message,
                userData: {eMail, password},
                userLogIn: req.session.userLogIn,
                userPhoto: req.session.userPhoto
            })
        })
    },

    logOut: (req, res) => {
        req.session.destroy(() => {
            res.redirect("/")
        })
    },

    settingsView: (req, res) => {
        res.render("settings", {
            title: "settings",
            error: null,
            userId: req.session.userId,
            userLogIn: req.session.userLogIn,
            userPhoto: req.session.userPhoto
        })
    },

    expenseDivider: (req, res) => {
        res.render("expenseDivider", {
            title: "expense divider",
            error: null,
            userId: req.session.userId,
            userLogIn: req.session.userLogIn,
            userPhoto: req.session.userPhoto
        })
    },

    updateUserById: (req, res) => {
        res.json("modificar un usuario con la id: " + req.params.id)
    },

    deleteUserById: (req, res) => {
        res.json("borrar un usuario con la id: " + req.params.id)
    }
}
module.exports = userControllers