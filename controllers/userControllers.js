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
        const {firstName, lastName, password, mail, photoURL} = req.body
        let encryptedPassword = bcryptjs.hashSync(password)
        try {
            const userToCreate = await new User({
                firstName, lastName, password: encryptedPassword, mail, photoURL
            })
            const userExist = await User.findOne({mail})
            if (userExist) {
                throw new Error("Mail already exist")
            } else {
                await userToCreate.save()
                req.session.userLogIn = true
                req.session.userId = userToCreate._id
                req.session.userPhoto = userToCreate.photoURL
                req.session.userEmail = userToCreate.mail
                req.session.userFirstName = userToCreate.firstName
                req.session.userLastName = userToCreate.lastName
                res.redirect("/debtsList")
            }
        } catch (e){
            res.render("signUp", {
                title: "sign Up",
                error: e.message,
                userData: {firstName, lastName, mail, photoURL},
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
        const {mail, password} = req.body
        User.findOne({mail: mail})
        .then(account => {
            if(!account) {
                throw new Error("Mail or password incorrect")
            } else {
                if(bcryptjs.compareSync(password, account.password)) {
                    req.session.userLogIn = true
                    req.session.userId = account._id
                    req.session.userPhoto = account.photoURL
                    req.session.userEmail = account.mail
                    req.session.userFirstName = account.firstName
                    req.session.userLastName = account.lastName    
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
                userData: {mail, password},
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
            validationError: null,
            userId: req.session.userId,
            userLogIn: req.session.userLogIn,
            userPhoto: req.session.userPhoto,
            userEmail: req.session.userEmail,
            userFirstName: req.session.userFirstName,
            userLastName: req.session.userLastName
        })
    },

    updateUserById: (req, res) => {
        User.findOneAndUpdate({_id: req.params.id}, {...req.body})
        .then(account => {
            if(account) {
                req.session.destroy(() => {
                    res.redirect("/")
                })
            } else {
                throw new Error
            }
        })
        .catch(e => {
            res.render("settings", {
                title: "settings",
                error: e.message,
                validationError: null,
                userId: req.session.userId,
                userLogIn: req.session.userLogIn,
                userPhoto: req.session.userPhoto,
                userEmail: req.session.userEmail,
                userFirstName: req.session.userFirstName,
                userLastName: req.session.userLastName
            })
        })
    },

    deleteUserById: (req, res) => {
        res.json("borrar un usuario con la id: " + req.params.id)
    }
}
module.exports = userControllers