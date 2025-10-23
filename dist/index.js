"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes/routes"));
const conectdb_1 = __importDefault(require("./config/conectdb"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// connect db
(0, conectdb_1.default)();
app.use("/api/v1", routes_1.default);
app.use((req, res) => {
    res.status(400).json({ success: false, message: "Endpoint not found" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server connected on port", PORT);
});
