import { Router } from "express";
import { createArticle, deleteArticle, getAllArticles, getArticleById, getMyArticles, getMyArticleById, updateArticle } from "../Controllers/article.controller.js";
import { validationArticleById, validationCreateArticle, validationUpdateArticle } from "../middlewares/validators/article.validator.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";

export const ArticleRoutes = Router();

ArticleRoutes.get("/articles", authMiddleware, getAllArticles);
ArticleRoutes.get("/articles/user", authMiddleware, getMyArticles);
ArticleRoutes.get("/articles/user/:id", authMiddleware, validationArticleById, validate, getMyArticleById);
ArticleRoutes.get("/articles/:id", authMiddleware, validationArticleById, validate, getArticleById);
ArticleRoutes.post("/articles", authMiddleware, validationCreateArticle, validate, createArticle);
ArticleRoutes.put("/articles/:id", authMiddleware, validationUpdateArticle, validate, ownerMiddleware, updateArticle);
ArticleRoutes.delete("/articles/:id", authMiddleware, validationArticleById, validate, ownerMiddleware, deleteArticle);