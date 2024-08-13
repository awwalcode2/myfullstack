const validate = (Schema)=> async(req,res, next)=>{
    const body = req.body
    try {
        if (body) {
            await Schema.validate(body)
            next()
        }
    } catch (error) {
        console.log(error);
        res.status(409).send({message:error.message})
    }
 
}
module.exports = {validate}