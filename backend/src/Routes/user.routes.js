import { Router } from "express";
import { crearUser, deleteUser, GetAllUsers, GetUserById, updateUser } from "../Controllers/user.controller.js";
import { validationCreateUser, validationUpdateUser, validationUserByid } from "../middlewares/validators/user.Validator.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const UserRoutes = Router();

UserRoutes.get("/users/",authMiddleware,adminMiddleware, GetAllUsers);
UserRoutes.get("/users/:id",authMiddleware,adminMiddleware, validationUserByid , validate,GetUserById);
UserRoutes.post("/users/",authMiddleware,adminMiddleware, validationCreateUser, validate ,crearUser)
UserRoutes.put("/users/:id",authMiddleware,adminMiddleware,validationUpdateUser, validate, updateUser)
UserRoutes.delete("/users/:id",authMiddleware,adminMiddleware,validationUserByid, validate, deleteUser)