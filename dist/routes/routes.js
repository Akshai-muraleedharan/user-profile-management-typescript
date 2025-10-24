"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userProfileController_1 = require("../controllers/userProfileController");
const v1Router = express_1.default.Router();
v1Router.post("/users", userProfileController_1.createUserProfile);
v1Router.get("/users", userProfileController_1.getUserProfiles);
v1Router.get("/users/:id", userProfileController_1.getSingleUserProfile);
v1Router.put("/users/:id", userProfileController_1.updateUserProfile);
v1Router.delete("/users/:id", userProfileController_1.deleteUserProfile);
exports.default = v1Router;
