import mongoose from 'mongoose';

const connectDB=async()=>{

    try {
        // console.log('enter')
        const conn = await mongoose.connect('mongodb://localhost:27017/multistoreDB') 
        console.log(`MongoDB connected:${conn.connection.host}`)
    } catch (error) {
        console.log(`Error:${error.message}`)
        process.exit(1)
    }
}
export default connectDB