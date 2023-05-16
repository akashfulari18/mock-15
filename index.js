const express = require('express')
const cors = require('cors')
const connection = require('./db')
const userRoute = require('./routes/user.routes')
const app = express()

app.use(cors())
app.use(express.json())

app.use("/users",userRoute)
app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected...")
        console.log(`server is running on port ${process.env.PORT}.`)
        
    } catch (error) {
        console.log("not connected...")
        
    }
})