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
exports.createUserProfile = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const joivalidation_1 = require("../utils/joivalidation");
const wordFirstLetterToUppercase_1 = require("../utils/wordFirstLetterToUppercase");
const createUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = joivalidation_1.UserProfileValidation.validate(req.body);
    if (error) {
        res.status(400).json({ success: false, message: error.details[0].message });
        return;
    }
    try {
        const { fullName, email, contactNumber, age, state, district, city, pincode, nationality } = value;
        const userExist = yield userModel_1.default.findOne({ email });
        if (userExist) {
            res.status(409).json({ success: false, message: "user already exist" });
            return;
        }
        const fullNameToUppercase = (0, wordFirstLetterToUppercase_1.firstLetterToUpperCase)(fullName);
        const stateToUppercase = (0, wordFirstLetterToUppercase_1.firstLetterToUpperCase)(state);
        const districtToUppercase = (0, wordFirstLetterToUppercase_1.firstLetterToUpperCase)(district);
        const cityToUppercase = (0, wordFirstLetterToUppercase_1.firstLetterToUpperCase)(city);
        const nationalityToUppercase = (0, wordFirstLetterToUppercase_1.firstLetterToUpperCase)(nationality);
        const newUser = new userModel_1.default({
            fullName: fullNameToUppercase,
            email,
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
        res.status(200).json({ success: true, message: "User profile create successfully", data: newUser });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUserProfile = createUserProfile;
