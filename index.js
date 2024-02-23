const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = require('./models')

//Routers
const todoListRouter = require('./routes/todoList')
app.use("/todoList", todoListRouter)



db.sequelize.sync().then(() => {

    app.listen(3001, () => {
        console.log("server is running on port 3001")
    })

})