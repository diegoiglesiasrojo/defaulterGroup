const joi = require('joi')
const validator = (req, res, next) => {
    const schema = joi.object({
        firstName: joi.string().min(2).max(35).pattern(new RegExp('[^0-9]+$')).required().messages({
            "string.max": "A maximum of 35 characters is allowed",
            "string.min": "A minimum of 2 characters is allowed",
            "string.pattern.base": "You can't use numbers"
        }),
        lastName: joi.string().min(2).max(35).pattern(new RegExp('[^0-9]+$')).required().messages({
            "string.max": "A maximum of 35 characters is allowed",
            "string.min": "A minimum of 2 characters is allowed",
            "string.pattern.base": "You can't use numbers"
        }),
        eMail: joi.string().min(6).max(255).email().required().messages({
            "string.max": "A maximum of 255 characters is allowed",
            "string.min": "A minimum of 6 characters is allowed",
            "string.email": "You must be use a valid mail"
        }),
        password: joi.string().min(4).max(255).required().messages({
            "string.max": "A maximum of 255 characters is allowed",
            "string.min": "A minimum of 4 characters is allowed",
        }),
        photoURL: joi.string().min(6).max(2048).required().messages({
            "string.max": "A maximum of 2048 characters is allowed",
            "string.min": "A minimum of 6 characters is allowed",
        })
    })
    const validation = schema.validate(req.body, {abortEarly: false})
    if (!validation.error) {
        next()
    } else {
        const {firstName, lastName, eMail, photoURL} = req.body
        res.render("signUp", {
            title: "sign Up",
            error: validation.error.details,
            userData: {firstName, lastName, eMail, photoURL},
            userLogIn: req.session.userLogIn
        })
    }
}

module.exports = validator