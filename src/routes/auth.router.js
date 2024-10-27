import express from "express";
import { validateLogin, validateRegister } from "../utils/validator.js";
import { postLogin, postRegister } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", validateRegister, postRegister);
authRouter.post("/login", validateLogin, postLogin);
export default authRouter;
