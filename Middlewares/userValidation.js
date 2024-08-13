const yup = require('yup')


let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
const userValidationShema = yup.object({
    firstname:yup.string().required("first name is essentiall here").max(15,"firstname should not be more than 15 characters"),
    lastname:yup.string().required("lastname is mandatory").max(15,"lastname should not be more than 15 characters"),
    email:yup.string("must be a valid email").required("email is mandatory").matches(emailRegex,"must be a valid email  address"),
    password:yup.string().required("must include your password").min(6)

})


module.exports = {userValidationShema}