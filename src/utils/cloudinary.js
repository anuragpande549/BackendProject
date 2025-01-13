import {v2 as cloudinary} from "cloudinary"
import fs from "fs" // file System

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadonCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return console.log("file path is not found");
        //upload file
        const response = cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        }) //file uploaded successfull
        console.log("file upload is successFull to cloudinary : ", response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)// remove the locally temporary save file which is failded for upload 
        console.error("File upload failed : ", error)
        return null;
    }
}

// CLOUDINARY_URL=cloudinary://316751964417267:DBkl_lqN3njULVg_yK400UwrH1M@dx6tne6ap