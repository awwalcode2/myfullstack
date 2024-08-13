const express = require(`express`)
require("dotenv").config()
// const mongoose = require("mongoose")
const connectdb = require("./configs/configs.user")
const app = express()
const router = require("./routes/user.router")
const cors = require("cors")
app.use(express.json({extended:true,limit:"50mb"}))
app.use(cors({origin:"*"}))
app.use("/user", router)

// const connectdb = require("./configs/configs.user")
// app.use(cors())
// app.use(cors({origin:"*"}))
// app.use(express.urlencoded({extended:true}))


// const connectdb = require("./configs/configs.user")





let Port = 4307 || process.env.Port
app.listen(Port, (err)=>{
    console.log(`app running on ${Port}`);
})

connectdb()










