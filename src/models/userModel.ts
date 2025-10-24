import { Schema, model } from "mongoose";
import { IuserProfile } from "../interfaces/userInterface"


const userProfileSchema = new Schema<IuserProfile>({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String },
    age: { type: Number },
    address: {
        state: { type: String },
        district: { type: String },
        city: { type: String },
        pincode: { type: String }
    },
    nationality: { type: String },
    isActive: { type: Boolean, default: false },

}, { timestamps: true })

const userProfileModel = model<IuserProfile>('User', userProfileSchema);

export default userProfileModel