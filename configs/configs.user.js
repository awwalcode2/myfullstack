const mongoose = require("mongoose")
// import mongoose from "mongoose"

 const connectdb = () => { 
    const URI = process.env.URI

    mongoose.connect(URI).then(()=>{
        console.log("connected to database successfully");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectdb

