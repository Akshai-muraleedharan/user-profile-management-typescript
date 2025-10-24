import express from "express"
import type { Router } from "express"
import { createUserProfile, deleteUserProfile, getSingleUserProfile, getUserProfiles, updateUserProfile } from "../controllers/userProfileController"

const v1Router: Router = express.Router()


v1Router.post("/users", createUserProfile)
v1Router.get("/users", getUserProfiles)
v1Router.get("/users/:id", getSingleUserProfile)
v1Router.put("/users/:id", updateUserProfile)
v1Router.delete("/users/:id", deleteUserProfile)

export default v1Router