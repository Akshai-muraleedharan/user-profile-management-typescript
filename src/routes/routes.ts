import express from "express"
import type { Request, Response, Router } from "express"



const v1Router: Router = express.Router()


v1Router.get('/', async (req: Request, res: Response<{ message: string }>): Promise<void> => {
    res.json({ message: "Hello world" })
})


export default v1Router