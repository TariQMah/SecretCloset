const express = require("express");
const cookieParser = require("cookie-parser");
const app = express()

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" })
}

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const designer = require("./routes/designer")
const spotted = require("./routes/spotted")
const collection = require("./routes/collection")
const user = require("./routes/user")

app.use("/api/v1/spotted", spotted)
app.use("/api/v1/designer", designer)
app.use("/api/v1/collection", collection)
app.use("/api/v1/auth", user)


module.exports = app