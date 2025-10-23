import express from "express"
import type { Request, Response, Router } from "express"
import { createUserProfile } from "../controllers/userProfileController"

const v1Router: Router = express.Router()


v1Router.get('/', async (req: Request, res: Response<{ message: string }>): Promise<void> => {
    res.json({ message: "Hello world" })
})

v1Router.post("/", createUserProfile)

export default v1Router