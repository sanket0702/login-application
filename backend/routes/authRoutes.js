import express from "express";
import {registerController} from "../controller/authController.js";
import { loginController } from "../controller/loginController.js";
 
const router =express.Router();




//reister user
router.post("/register",registerController)



router.post("/login",loginController);

export default router;

