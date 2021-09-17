const User = require("../models/User")
const bcryptjs = require("bcryptjs")

const userControllers = {
    signUpView: (req, res) => {
        res.render("signUp", {
            title: "sign Up",
            error: null,
            userData: undefined,
            userLogIn: req.session.userLogIn,
            validationError: null
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
                res.redirect("/users/signIn")
            }
        } catch (e){
            res.render("signUp", {
                title: "sign Up",
                error: e,
                userData: {firstName, lastName, eMail, photoURL},
                userLogIn: req.session.userLogIn,
                validationError: null
            })
        }
    },

    signInView: (req, res) => {
        res.render("signIn", {
            title: "sign In",
            error: null,
            userData: undefined,
            userLogIn: req.session.userLogIn
        })
    },

    signIn: (req, res) => {
        const {eMail, password} = req.body
        User.findOne({eMail: eMail})
        .then(account => {
            if(!account) {
                throw new Error()
            } else {
                if(bcryptjs.compareSync(password, account.password)) {
                    req.session.userLogIn = true
                    res.redirect("/debtsList")
                } else {
                    throw new Error()
                }
            }
        })
        .catch(() => {
            res.render("signIn", {
                title: "sign In",
                error: "Mail or password incorrect",
                userData: {eMail, password},
                userLogIn: req.session.userLogIn
            })
        })
    },

    logOut: (req, res) => {
        req.session.destroy(() => {
            res.redirect("/")
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