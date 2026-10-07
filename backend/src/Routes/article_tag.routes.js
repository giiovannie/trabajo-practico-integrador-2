import { Router } from "express";
import { createArticleTag, deleteArticleTag } from "../Controllers/article_tag.controller.js";
import { articleTagValidatorById, articleTagValidatorCreate } from "../middlewares/validators/article_tag.validator.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const ArticleTagRoutes = Router();

ArticleTagRoutes.post("/articles-tags",authMiddleware, articleTagValidatorCreate, validate, createArticleTag);
ArticleTagRoutes.delete("/articles-tags/:articleTagId",authMiddleware, articleTagValidatorById, validate, deleteArticleTag);