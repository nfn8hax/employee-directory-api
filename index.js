const express = require("express")
const cors = require('cors')
const app = express()
const router = require("./routes/api")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

/* ----------------------- Connect to MongoDB Database ---------------------- */
mongoose.connect("mongodb://localhost/employee-master")
mongoose.Promise = global.Promise

/* ------------------------ allow cross-origin access ----------------------- */
app.use(cors())

/* ---------------- Body-parser to get access to request data --------------- */
app.use(bodyParser.json())

/* -------------------------------------------------------------------------- */
/*               Middleware to create and handle route requests               */
/* -------------------------------------------------------------------------- */
app.use("/api", router)

/* ------------------------ "error handling function" ----------------------- */
app.use((error, request, response) => {
    // console.log(error)
    response.status(422).send({error: error._message})
})
/* ------------ error handling function should come after router ------------ */

app.listen(process.env.PORT || 4000, () => console.log("now listening for requests"))