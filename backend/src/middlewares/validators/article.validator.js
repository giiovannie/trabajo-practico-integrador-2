import { ArticleModel } from "../../Models/Article.js";
import { body, param } from "express-validator";
import { UserModel } from "../../Models/User.js";

export const validationArticleById = [
    param("id")
        .notEmpty().withMessage("el id esta vacio")
        .isInt().withMessage("el id no es del tipo numerico")
        .bail()
        .custom(async (id) => {
            const articleExist = await ArticleModel.findByPk(id);
            if(!articleExist) throw new Error("el article no existe");
            return true;
        })
]

export const validationCreateArticle = [
    body("title")
        .notEmpty().withMessage("el titulo esta vacio")
        .isString().withMessage("el titulo no es del tipo string")
        .isLength({ min: 3, max:200 }).withMessage("el titulo debe tener entre 3 y 300 caracteres"),
    body("content")
        .notEmpty().withMessage("el contenido esta vacio")
        .isString().withMessage("el contenido no es del tipo string")
        .isLength({min: 50}).withMessage("el contenido debe tener al menos 50 caracteres"),
    body("excerpt")
        .optional()
        .isString().withMessage("el resumen no es del tipo string")
        .isLength({max: 500 }).withMessage("el resumen no tiene un maximo de 500 caracteres"),
    body("status")
        .notEmpty().withMessage("el status esta vacio")
        .isIn(["archived", "published"]).withMessage("el status no es valido"),
    body("user_id")
        .notEmpty().withMessage("el author_id esta vacio")
        .isInt().withMessage("el author_id no es del tipo numerico")
        .bail()
        .custom(async (author_id) => {
            const authorExist = await UserModel.findByPk(author_id);
            if(!authorExist) throw new Error("el author no existe");
            return true;
        })
]

export const validationUpdateArticle = [
    param("id")
        .notEmpty().withMessage("el id esta vacio")
        .isInt().withMessage("el id no es del tipo numerico")
        .notEmpty().withMessage("el id esta vacio"),
    body("title")
        .optional()
        .isString().withMessage("el titulo no es del tipo string")
        .isLength({ min: 3, max:300 }).withMessage("el titulo debe tener entre 3 y 300 caracteres"),
    body("content")
        .optional()
        .isString().withMessage("el contenido no es del tipo string")
        .isLength({min: 50}).withMessage("el contenido debe tener al menos 50 caracteres"),
    body("excerpt")
        .optional()
        .isString().withMessage("el resumen no es del tipo string")
        .isLength({max: 500 }).withMessage("el resumen no tiene un maximo de 500 caracteres"),
    body("status")
        .optional()
        .isIn(["draft", "published"]).withMessage("el status no es valido"),
    body("author_id")
        .notEmpty().withMessage("el author_id esta vacio")
        .isInt().withMessage("el author_id no es del tipo numerico")
]