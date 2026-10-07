import { Router } from "express";
import { register, login, logout, getProfile, updateProfile} from "../Controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { validationRegister, validationLogin, validationUpdateAuthProfile } from "../middlewares/validators/auth.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const AuthRoutes = Router();

AuthRoutes.post("/auth/register", validationRegister, validate, register);
AuthRoutes.post("/auth/login", validationLogin, validate, login);
AuthRoutes.get("/auth/profile", authMiddleware, getProfile);
AuthRoutes.put("/auth/profile", authMiddleware, validationUpdateAuthProfile, validate, updateProfile);
AuthRoutes.post("/auth/logout", authMiddleware, logout);
