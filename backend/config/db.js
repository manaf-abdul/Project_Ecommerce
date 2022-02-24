import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB=async()=>{

    try {
        // console.log('enter')
        const conn = await mongoose.connect(process.env.MONGODB_URI) 
        console.log(`MongoDB connected:${conn.connection.host}`)
    } catch (error) {
        console.log(`Error:${error.message}`)
        process.exit(1)
    }
}
export default connectDB