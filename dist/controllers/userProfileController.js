"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserProfile = exports.updateUserProfile = exports.getSingleUserProfile = exports.getUserProfiles = exports.createUserProfile = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const joivalidation_1 = require("../utils/joivalidation");
const wordFirstLetterToUppercase_1 = require("../utils/wordFirstLetterToUppercase");
const mongoose_1 = require("mongoose");
// create user profile
const createUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //  data validation
    const { error, value } = joivalidation_1.UserProfileValidation.validate(req.body);
    if (error) {
        res.status(400).json({ success: false, message: error.details[0].message });
        return;
    }
    try {
        // after validation data destructuring  
        const { fullName, email, contactNumber, age, state, district, city, pincode, nationality } = value;
        // To find user already exist to prevent duplicate document creation 
        const userExist = yield userModel_1.default.findOne({ email });
        if (userExist) {
            res.status(409).json({ success: false, message: "Account already exist" });
            return;
        }
        // word first letter to case function invoke
        const fullNameToUppercase = (0, wordFirstLetterToUppercase_1.firstLetterToUpperCase)(fullName);
        const stateToUppercase = (0, wordFirstLetterToUppercase_1.firstLetterToUpperCase)(state);
        const districtToUppercase = (0, wordFirstLetterToUppercase_1.firstLetterToUpperCase)(district);
        const cityToUppercase = (0, wordFirstLetterToUppercase_1.firstLetterToUpperCase)(city);
        const nationalityToUppercase = (0, wordFirstLetterToUppercase_1.firstLetterToUpperCase)(nationality);
        const newUser = new userModel_1.default({
            fullName: fullNameToUppercase.trim(),
            email: email.trim(),
            contactNumber,
            age,
            address: {
                state: stateToUppercase,
                district: districtToUppercase,
                city: cityToUppercase,
                pincode
            },
            nationality: nationalityToUppercase
        });
        yield newUser.save();
        res.status(201).json({ success: true, message: "User profile create successfully", data: newUser });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});
exports.createUserProfile = createUserProfile;
// fetch user's document
const getUserProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    try {
        const totalItem = yield userModel_1.default.countDocuments();
        const totalPages = Math.ceil(totalItem / limit);
        const skip = (page - 1) * limit;
        // fetch user's full document 
        const fetchUserProfile = yield userModel_1.default.find().skip(skip).limit(limit);
        res.status(200).json({ success: true, message: "Data fetch successfully", currentPage: page, totalPages, totalItem, data: fetchUserProfile });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});
exports.getUserProfiles = getUserProfiles;
const getSingleUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ success: false, message: "Id not get" });
        return;
    }
    const isValidId = mongoose_1.Types.ObjectId.isValid(id);
    if (isValidId === false) {
        res.status(400).json({ success: false, message: "Invalid User ID format" });
        return;
    }
    try {
        const findsingleUser = yield userModel_1.default.findById(id);
        if (!findsingleUser) {
            res.status(404).json({ success: false, message: "User profile not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Data fetch successfully", data: findsingleUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});
exports.getSingleUserProfile = getSingleUserProfile;
// update user profile by id
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //  data validation
    const { error, value } = joivalidation_1.UserProfileValidation.validate(req.body);
    if (error) {
        res.status(400).json({ success: false, message: error.details[0].message });
        return;
    }
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ success: false, message: "Id not get" });
        return;
    }
    const isValidId = mongoose_1.Types.ObjectId.isValid(id);
    if (isValidId === false) {
        res.status(400).json({ success: false, message: "Invalid User ID format" });
        return;
    }
    try {
        // find user by id 
        const findUserProfileExistById = yield userModel_1.default.findById(id);
        if (!findUserProfileExistById) {
            res.status(404).json({ success: false, message: "User profile not found" });
            return;
        }
        // after validation data destructuring  
        const { fullName, email, contactNumber, age, state, district, city, pincode, nationality } = value;
        // word first letter to case function invoke
        const fullNameToUppercase = (0, wordFirstLetterToUppercase_1.firstLetterToUpperCase)(fullName);
        const stateToUppercase = (0, wordFirstLetterToUppercase_1.firstLetterToUpperCase)(state);
        const districtToUppercase = (0, wordFirstLetterToUppercase_1.firstLetterToUpperCase)(district);
        const cityToUppercase = (0, wordFirstLetterToUppercase_1.firstLetterToUpperCase)(city);
        const nationalityToUppercase = (0, wordFirstLetterToUppercase_1.firstLetterToUpperCase)(nationality);
        const updateprofile = yield userModel_1.default.findByIdAndUpdate(id, {
            fullName: fullNameToUppercase.trim(),
            email: email.trim(),
            contactNumber,
            age,
            address: {
                state: stateToUppercase,
                district: districtToUppercase,
                city: cityToUppercase,
                pincode
            },
            nationality: nationalityToUppercase
        }, { new: true });
        res.status(200).json({ success: true, message: "Data fetch successfully", data: updateprofile });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});
exports.updateUserProfile = updateUserProfile;
const deleteUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const isValidId = mongoose_1.Types.ObjectId.isValid(id);
    if (isValidId === false) {
        res.status(400).json({ success: false, message: "Invalid User ID format" });
        return;
    }
    try {
        const findUserProfileExistById = yield userModel_1.default.findById(id);
        if (!findUserProfileExistById) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        yield userModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ success: false, message: "User profile delete successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});
exports.deleteUserProfile = deleteUserProfile;
