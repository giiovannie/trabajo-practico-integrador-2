import { ArticleModel } from "../../Models/Article.js";
import { TagModel } from "../../Models/Tag.js";
import { body, param } from "express-validator";

export const articleTagValidatorCreate = [
  body("article_id")
    .notEmpty().withMessage("el article_id es obligatorio")
    .isInt({ min: 1 }).withMessage("el article_id debe ser un entero valido")
    .bail()
    .custom(async (value) => {
      const article = await ArticleModel.findByPk(value);
      if (!article) throw new Error("el articulo no existe");
      return true;
    }),
  body("tag_id")
    .notEmpty().withMessage("el tag_id es obligatorio")
    .isInt({ min: 1 }).withMessage("el tag_id debe ser un entero valido")
    .bail()
    .custom(async (value) => {
      const tag = await TagModel.findByPk(value);
      if (!tag) throw new Error("la etiqueta no existe");
      return true;
    })
];

export const articleTagValidatorById = [
  param("articleTagId")
    .notEmpty().withMessage("el id de la relacion es obligatorio")
    .isInt({ min: 1 }).withMessage("el id debe ser un entero valido")
];