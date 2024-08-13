const express = require("express")
const router = express.Router()
const { signup, login,verifydashboard,uploadProfile} = require("../controllers/user.controller")
const {userValidationShema} = require("../Middlewares/userValidation")
const {validate} = require("../Middlewares/validator")
router.post("/signup", validate(userValidationShema),signup)
router.post("/login",login)
router.get("/dashboard",verifydashboard)
router.post("/upload",uploadProfile)




module.exports = router