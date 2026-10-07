import { Router } from "express";
import {getAllPerfiles, getPerfileById, createPerfil, updatePerfil, deletePerfil} from "../Controllers/profile.controller.js";
import { validationCreateProfile, validationProfileById, validationUpdateProfile } from "../middlewares/validators/profile.validator.js";
import { validate } from "../middlewares/validate.js";

export const PerfilRouter = Router();

PerfilRouter.get("/profiles", getAllPerfiles);
PerfilRouter.get("/profiles/:id",validationProfileById, validate ,getPerfileById);
PerfilRouter.post("/profiles",validationCreateProfile,validate, createPerfil);
PerfilRouter.put("/profiles/:id",validationUpdateProfile,validate, updatePerfil);
PerfilRouter.delete("/profiles/:id",validationProfileById, validate,  deletePerfil);