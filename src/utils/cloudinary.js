import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
        
})
const uploadOncloudinary=async(localfilepath)=>{
        try {
                if(!localfilepath) return null   //throw new Error('Could not find the file path.') or  console.error("File path not provided.");
                
                console.log("Attempting to upload file:", localfilepath); // Debug log
                
                //upload the file on cloudinary
                const response= await cloudinary.uploader.upload(localfilepath,{
                        resource_type:'auto'
                }) //file has been uploaded successfully
                console.log("file is uploaded on cloudinary",response.url); //for client to see
                
                // Remove the local file after successful upload
                fs.unlinkSync(localfilepath); //remove the locally saved temp file as the upload operation got sucessfully
                return response //this reflects in the user side , to get the data
                
        } catch (error) {
                console.error("Cloudinary upload error:", error); // Log the actual error
                // Remove the local file if it exists
                fs.unlinkSync(localfilepath); // remove the locally saved temporary file as the upload operation got failed
                return null;
                return null
        }
}
export {uploadOncloudinary}