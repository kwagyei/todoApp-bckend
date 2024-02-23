const express = require('express')
const app = express()
const cors = require('cors')
require("dotenv").config()

app.use(express.json())
app.use(cors())

const db = require('./models')

//Routers
const todoListRouter = require('./routes/todoList')
app.use("/todoList", todoListRouter)



db.sequelize.sync().then(() => {

        app.listen(process.env.PORT || 3001, () => {
            console.log("server is running on port 3001")
        })

    })
    .catch((err) => {
        console.log(err)
    })