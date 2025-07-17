import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECERT
        
})
const uploadOncloudinary=async(localfilepath)=>{
        try {
                if(!localfilepath) return null   //throw new Error('Could not find the file path.') or  console.error("File path not provided.");
                //upload the file on coludinary
                const respone= await cloudinary.uploader.upload(localfilepath,{
                        resource_type:'auto'
                }) //file has been uploaded sucessfully
                console.log("file is uploaded on coludinary",respone.url); //for client to see
                return respone //this reflects in the user side , to get the data
                
        } catch (error) {
                fs.unlinkSync(localfilepath) //remove the locally saved temp file as the upload opreation got failed
                return null
        }
}
export {uploadOncloudinary}