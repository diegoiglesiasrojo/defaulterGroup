const mongoose = require("mongoose")
const debtSchema = new mongoose.Schema({
    // userId: {type: mongoose.Types.ObjectId, ref: "user"},
    userId: {type: String, required: true},
    date: {type: Date, default: Date.now},
    debtor: {type: String, required: true},
    debt: {type: Number, required: true},
    isUSD: {type: Boolean, required: true}
})
const Debt = mongoose.model("debt", debtSchema)
module.exports = Debt