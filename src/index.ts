import express from "express";
import type { Express, Request, Response } from "express"
import dotenv from "dotenv"
import v1Router from "./routes/routes"

dotenv.config()

const app: Express = express()



// app.get("/", (req: Request, res: Response<{ message: string }>) => {
//     res.json({ message: "Hello world" })
// })


app.use("/api/v1", v1Router)

const PORT: number | string = process.env.PORT || 3000



app.listen(PORT, (): void => {
    console.log("server connected on port", PORT)
})