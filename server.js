const express = require("express")
const cors = require("cors")
require("dotenv").config()
const router = require("./route/index")
require("./config/database")
const session = require("express-session")
const mongoConnection = require("connect-mongodb-session")(session)
const store = new mongoConnection({
    uri: process.env.MONGODB,
    collection: "sessions"
})

const app = express()
app.use(express.static("public"))
app.use(cors())
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: process.env.SECRETORKEY,
    resave: false,
    saveUninitialized: false,
    store
}))
app.use("/", router)
app.listen(process.env.PORT || 4000, process.env.HOST || '0.0.0.0', () => console.log("server listening..."))