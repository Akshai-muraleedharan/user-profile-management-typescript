import express from "express";
import type { Express, Request, Response } from "express"
import dotenv from "dotenv"
import v1Router from "./routes/routes"
import connectDB from "./config/conectdb"


dotenv.config()

const app: Express = express()

app.use(express.json())

// connect db
connectDB()

app.use("/api/v1", v1Router)

app.use((req: Request, res: Response<{ success: boolean, message: string }>): void => {
    res.status(400).json({ success: false, message: "Endpoint not found" })
})

const PORT: number | string = process.env.PORT || 3000



app.listen(PORT, (): void => {
    console.log("server connected on port", PORT)
})