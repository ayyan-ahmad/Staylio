const cloudinary = require('cloudinary').v2;//cloudinary version 2
const { CloudinaryStorage } = require('multer-storage-cloudinary');//multer storage for cloudinary


// configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
 

// configure cloudinary storage 
const storage =  new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
    folder: 'Wanderlust_DEV', // folder name in cloudinary
    allowedFormats: ['jpeg', 'png', 'jpg']
    },
});


module.exports={cloudinary,storage};