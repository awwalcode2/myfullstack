const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


let userSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    profileimage : {type:String , required : true}
}, {timestamps:true})
// let saltRound = 10

// userSchema.pre("save",function(next){
//     bcrypt.hash(this.password,saltRound,(err,hashedPassword)=>{
//         if (err) {
//             console.log(err);
//         }else{
//             this.password = hashedPassword
//             next()
//         }
//     })
// })

let userModel = mongoose.model("learnBackend",userSchema)




module.exports = userModel