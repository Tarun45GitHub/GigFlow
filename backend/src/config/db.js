import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        // console.log(process.env.MONGODB_URL);
        
        const connectionResponse=await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log(`\n MongoDB Connected !! DB Host : ${connectionResponse.connection.host}`);
        
    } catch (error) {
       console.log("ERROR:while connect DB ",error);
        process.exit(1)
    }
}

export default connectDB;
