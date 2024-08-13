const mailer = require("nodemailer")

const messageTemplate = `
<div>${firstname}</div>
<div>${lastname}</div>
<div>${email}</div>
<div>${Password}</div>
`
const usermailer = async(email,firstname)=>{
  const transporter = await mailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.emailPassword,
        pass:process.env.userEmail
    }
   })


   const mailoptions = {
    from:process.env.userEmail,
    to:email,
    subject:"welcome message",
    html: messageTemplate
   }
   try {
    let sentmail = await transporter.sendMail(mailoptions)
    if (sentmail) {
        console.log("mail sent successfully");
    }
   } catch (error) {
    console.log(error.message);
    throw{
        errorname:"mail error",
        message:error.message
    }
   }
}