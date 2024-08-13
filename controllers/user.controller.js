const userModel = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cloudinary = require("../utlis/cloudinary")


const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body
  if (!firstname || !lastname || !email || !password) {
    res.status(400).send({ message: "all fields are required" })
  } else {
    try {
      const existuser = await userModel.findOne({ email: email })
      if (existuser) {
        res.status(400).send({ message: "hoops!! user already exist try to sign up^" })
      } else {
        const hashedPassword = await bcryptjs.hash(password, 10)
        const createduser = await userModel.create({ firstname, lastname, email, password: hashedPassword })
        if (createduser) {
  
          // res.status(200).send({ message: "sign up successful", status: `okay` })
        } else {
          res.status(400).send({ message: "unable to sign  sign up  successful" })
        }

      }
    } catch (error) {
      res.status(500).send({ message: "internal server error" })
      console.log(error);
    }
  }

}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).send({ message: "all fields are to be filled" })
  } else {
    try {
      let existuser = await userModel.findOne({ email })
      if (!existuser) {
        res.status(400).send({ message: "invalid email or password" })
      } else {
        let realpassword = await bcryptjs.compare(password, existuser.password)
        if (!realpassword) {
          res.status(400).send({ message: "invalid email or password"})
        } else {
          let token = await jwt.sign({email},"dontTryGuessingMySecretCode",{expiresIn:"30h"})
          res.status(200).send({message: "login successful", status:"okay",token})
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "internal server error" })
    }
  }


}


const verifydashboard = async (req,res)=>{
  let token = req.headers.authorization.split(" ")[1]
 jwt.verify(token,"dontTryGuessingMySecretCode",(err,res)=>{
  if (err) {
    console.log(err);
    res.status(410).send({ message: "internal serval error",status:false })
  }else{
    res.status(210).send({ message: "token generated successfully", status:true, token })
        console.log(res);
  }
 })
//  .then((res)=>{
//     res.status(210).send({ message: "token generated successfully",status:true,token })
//     console.log(res);
//   }).catch((err)=>{
//     res.status(410).send({ message: "internal serval error" })
//     console.log(err);
//   })
}

const uploadProfile = async (req,res)=>{
  console.log(req.body);
  console.log(req.headers);
  const token = req.headers.authorization.split(" ")[1]
  const {imagefile} = req.body
  if (!imagefile) {
    res.status(404).send({message:"image cannot be empty",status:false})
  }
  
 let verifytoken =  await jwt.verify(token,"dontTryGuessingMySecretCode")
 console.log(verifytoken);
 const email = verifytoken.email
 if (!verifytoken) {
  res.status(400).send({message:"invalid token",status:false})
 }
const image = await cloudinary.uploader.upload(imagefile)
console.log(image.secure_url);
const upload = await userModel.findOneAndUpdate( 
  {email},
  {profileimage:image.secure_url},
  {new:true}
  )
  if (upload) {
    res.status(200).send({message:"profile uploaded successfully",status:true})
  }else{
    res.status(405).send({message:"error occured while uploading image ",status:false})
  }

}

















module.exports = { signup, login, verifydashboard,uploadProfile }




// const { firstname, lastname, email, password } = req.body
// if (!firstname || !lastname || !email || !password) {
//   res.status(400).send({ message: "all fields are mandatory" })
// } else {
//   const verifyEmail = await userModel.findOne({ email })
//   if (verifyEmail) {
//     res.status(400).send({ message: "User already exist, try to login instead" })
//   } else {
//     try {
//       const hashedPassword = await bcryptjs.hash(password, 10)
//       const createUser = await userModel.create({
//         firstname,
//         lastname,
//         email,
//         password: hashedPassword
//       })
//       if (!createUser) {
//         res.status(400).send({ message: "unable to craete user" })
//       } else {
//         res.status(200).send({ message: "user craeted successfully" })
//         console.log("created user :", createUser);
//       }
//     } catch (error) {
//       res.status(500).send({ message: "internal server error" })
//       console.log(error);
//     }


//   }
// }