import { Router } from "express";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "../Controllers/tag.controller.js";
import { tagValidatorCreate, validationTagById, validationUpdateTag } from "../middlewares/validators/tag.validator.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const TagRoutes = Router();

TagRoutes.get("/tags", authMiddleware,getAllTags);
TagRoutes.get("/tags/:id",authMiddleware, adminMiddleware , validationTagById, validate, getTagById);
TagRoutes.post("/tags",authMiddleware, adminMiddleware , tagValidatorCreate, validate, createTag);
TagRoutes.put("/tags/:id",authMiddleware, adminMiddleware , validationUpdateTag, validate, updateTag);
TagRoutes.delete("/tags/:id",authMiddleware, adminMiddleware , validationTagById, validate, deleteTag);