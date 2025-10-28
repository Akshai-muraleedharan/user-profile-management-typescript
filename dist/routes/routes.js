"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userProfileController_1 = require("../controllers/userProfileController");
const v1Router = express_1.default.Router();
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *        - User profile management api's
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: jack
 *               email:
 *                 type: string
 *                 example: jack@gmail.com
 *               contactNumber:
 *                 type: string
 *                 example: 9483748374
 *               age:
 *                 type: number
 *                 example: 29
 *               nationality:
 *                 type: string
 *                 example: indian
 *               state:
 *                 type: string
 *                 example: tamilnadu
 *               district:
 *                 type: string
 *                 example: theni
 *               city:
 *                 type: string
 *                 example: theni
 *               pincode:
 *                 type: string
 *                 example: 685943
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 68fb25923c3528d37fae3aad
 *                     fullName:
 *                       type: string
 *                       example: test
 *                     email:
 *                       type: string
 *                       example: test@example.com
 *                     nationality:
 *                       type: string
 *                       example: testnationality
 *                     address:
 *                       type: object
 *                       properties:
 *                         state:
 *                           type: string
 *                           example: kerala
 *                         district:
 *                           type: string
 *                           example: ernakulam
 *                         city:
 *                           type: string
 *                           example: kakkanad
 *                         pincode:
 *                           type: string
 *                           example: 685943
 *       400:
 *         description: Invalid request data
 *       409:
 *         description: Account already exists
 *       500:
 *          description: Internal server error
 */
v1Router.post("/users", userProfileController_1.createUserProfile);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags:
 *        - User profile management api's
 *     parameters:
 *       - name : limit
 *         in: query
 *         schema:
 *           type: string
 *           default: 6
 *       - name: page
 *         in: query
 *         schema:
 *           type: string
 *           default: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   success:
 *                      type: boolean
 *                      example: true
 *                   message:
 *                      type: string
 *                      example: User created successfully
 *                   id:
 *                     type: string
 *                     example: 68fb25923c3528d37fae3aaa
 *                   fullName:
 *                     type: string
 *                     example: test
 *                   email:
 *                      type: string
 *                      example: test@gmail.com
 *                   contactNumber:
 *                      type: string
 *                      example: 948948394
 *                   age:
 *                      type: number
 *                      example: 28
 *                   nationality:
 *                       type: string
 *                       example: testnationality
 *                   isActive:
 *                       type: boolean
 *                       example: false
 *                   address:
 *                        type: object
 *                        properties:
 *                           state:
 *                             type: string
 *                             example: kerala
 *                           district:
 *                             type: string
 *                             example: ernakulam
 *                           city:
 *                             type: string
 *                             example: kakkanad
 *                           pincode:
 *                             type: string
 *                             example: 685943
 *
 */
v1Router.get("/users", userProfileController_1.getUserProfiles);
/**
 * @swagger
 *
 *  /users/{id}:
 *    get:
 *      summary: get user by ID
 *      tags:
 *        - User profile management api's
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *              example : 68fb25923c3528d37fae3aaa
 *      responses:
 *        200:
 *         description: User found
 *        404:
 *         description: User profile not found
 *        500:
 *         description: Internal server error
 */
v1Router.get("/users/:id", userProfileController_1.getSingleUserProfile);
/**
 * @swagger
 *
 * /users/{id}:
 *   put:
 *     summary: Update user profile by ID
 *     tags:
 *        - User profile management api's
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             example : 68fb25923c3528d37fae3aaa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: jack
 *               email:
 *                 type: string
 *                 example: jack@gmail.com
 *               contactNumber:
 *                 type: string
 *                 example: 9483748374
 *               age:
 *                 type: number
 *                 example: 29
 *               nationality:
 *                 type: string
 *                 example: indian
 *               state:
 *                 type: string
 *                 example: tamilnadu
 *               district:
 *                 type: string
 *                 example: theni
 *               city:
 *                 type: string
 *                 example: theni
 *               pincode:
 *                 type: string
 *                 example: 685943
 *
 *     responses:
 *        200:
 *         description: User profile Update successfully
 *        400:
 *         description: Invalid request data
 *        404:
 *         description: User profile not found
 *        500:
 *         description: Internal server error
 */
v1Router.put("/users/:id", userProfileController_1.updateUserProfile);
/**
 * @swagger
 *
 * /users/{id}:
 *   delete:
 *     summary: User profile delete by ID
 *     tags:
 *        - User profile management api's
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *              example : 68fb25923c3528d37fae3aaa
 *
 *     responses:
 *        200:
 *         description: User delete successfully
 *        404:
 *         description: User profile not found
 *        500:
 *          description: Internal server error
 *
 *
 */
v1Router.delete("/users/:id", userProfileController_1.deleteUserProfile);
exports.default = v1Router;
