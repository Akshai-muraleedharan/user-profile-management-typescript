import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

async function connectDB(): Promise<void> {
    try {
        mongoose.connect(process.env.MONGOURL)
        console.log("Mongodb connectDB successfully")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB