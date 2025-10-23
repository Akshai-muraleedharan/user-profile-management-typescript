import type { Request, Response } from "express"
import userProfileModel from "../models/userModel"
import { IuserProfile } from "../interfaces/userInterface"
import { UserProfileValidation } from "../utils/joivalidation"
import { firstLetterToUpperCase } from "../utils/wordFirstLetterToUppercase"

export const createUserProfile = async (req: Request, res: Response<{ success: boolean, message: string, data?: IuserProfile }>): Promise<void> => {

    const { error, value } = UserProfileValidation.validate(req.body)

    if (error) {
        res.status(400).json({ success: false, message: error.details[0].message })
        return;
    }

    try {


        const { fullName, email, contactNumber, age, state, district, city, pincode, nationality } = value;

        const userExist = await userProfileModel.findOne({ email })

        if (userExist) {
            res.status(409).json({ success: false, message: "user already exist" })
            return;
        }

        const fullNameToUppercase = firstLetterToUpperCase(fullName)
        const stateToUppercase = firstLetterToUpperCase(state)
        const districtToUppercase = firstLetterToUpperCase(district)
        const cityToUppercase = firstLetterToUpperCase(city)
        const nationalityToUppercase = firstLetterToUpperCase(nationality)

        const newUser = new userProfileModel({
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
        })

        await newUser.save()

        res.status(200).json({ success: true, message: "User profile create successfully", data: newUser })
    } catch (error) {
        console.log(error)
    }
}