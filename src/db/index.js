import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";


const connectDB= async()=>{
    try {
       const connectionINSTANCES= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n mongodb connected !! DBHOST:${connectionINSTANCES.connection.host}`);
        
    } catch (error) {
        console.log("EROOR in mongodb eroor:",error);
        process.exit(1) //throw error  to exit the catch function.
    }
}
export default connectDB