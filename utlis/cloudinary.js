const cloudinary = require("cloudinary").v2








cloudinary.config(
    {
        cloud_name: 'dam25jdq8', 
        api_key: '237776627629391', 
        api_secret: process.env.API_SECRET
    }
)

module.exports = cloudinary