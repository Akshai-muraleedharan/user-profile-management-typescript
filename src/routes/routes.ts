import express from "express"
import type { Request, Response, Router } from "express"
import { createUserProfile, deleteUserProfile, getUserProfiles, updateUserProfile } from "../controllers/userProfileController"

const v1Router: Router = express.Router()




v1Router.post("/", createUserProfile)
v1Router.get("/", getUserProfiles)
v1Router.put("/:id", updateUserProfile)
v1Router.delete("/:id", deleteUserProfile)

export default v1Router