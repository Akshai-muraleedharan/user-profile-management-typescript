"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// app.get("/", (req: Request, res: Response<{ message: string }>) => {
//     res.json({ message: "Hello world" })
// })
app.use("/api/v1", routes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server connected on port", PORT);
});
