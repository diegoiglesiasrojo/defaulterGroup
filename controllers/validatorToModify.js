const joi = require('joi')
const validatorToModify = (req, res, next) => {
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
        mail: joi.string().min(6).max(255).email().required().messages({
            "string.max": "A maximum of 255 characters is allowed",
            "string.min": "A minimum of 6 characters is allowed",
            "string.email": "You must be use a valid mail"
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
        const {firstName, lastName, mail, photoURL} = req.body
        res.render("settings", {
            title: "settings",
            validationError: validation.error.details,
            error: null,
            userId: req.session.userId,
            userLogIn: req.session.userLogIn,
            userPhoto: photoURL,
            userEmail: mail,
            userFirstName: firstName,
            userLastName: lastName
        })
    }
}

module.exports = validatorToModify