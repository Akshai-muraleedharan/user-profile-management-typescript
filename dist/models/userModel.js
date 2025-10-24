"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userProfileSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const userProfileModel = (0, mongoose_1.model)('User', userProfileSchema);
exports.default = userProfileModel;
