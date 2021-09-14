const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())
app.listen(4000, () => console.log("server listening on port 4000"))