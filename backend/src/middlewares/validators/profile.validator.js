import { ProfileModel } from "../../Models/Profile.js";
import { UserModel } from "../../Models/User.js";
import { body, param } from "express-validator";

export const validationProfileById = [
  param("id")
    .notEmpty().withMessage("el id esta vacio")
    .isInt().withMessage("el id no es del tipo numerico")
    .bail()
    .custom(async (id) => {
      const profileExist = await ProfileModel.findByPk(id);
      if (!profileExist) throw new Error("el profile no existe");
      return true;
    })
];

export const validationCreateProfile = [
  body("first_name")
    .notEmpty().withMessage("el first name esta vacio")
    .isString().withMessage("el first name no es del tipo string")
    .isLength({ min: 2, max: 50 }).withMessage("el first name debe tener entre 2 y 50 caracteres"),
  body("last_name")
    .notEmpty().withMessage("el last name esta vacio")
    .isString().withMessage("el last name no es del tipo string")
    .isLength({ min: 2, max: 50 }).withMessage("el last name debe tener entre 2 y 50 caracteres"),
  body("biography")
    .optional()
    .isString().withMessage("la biografia no es del tipo string")
    .isLength({ max: 500 }).withMessage("la biografia debe tener como maximo 500 caracteres"),
  body("avatar_url")
    .optional()
    .isURL().withMessage("el avatar_url no es una URL valida"),
  body("birth_date")
    .optional()
    .isISO8601().withMessage("la fecha de cumpleaños no es una fecha valida"),
  body("user_id")
    .notEmpty().withMessage("el user_id esta vacio")
    .isInt({ min: 1 }).withMessage("el user_id debe ser un numero entero")
    .bail()
    .custom(async (id) => {
      const userExist = await UserModel.findByPk(id);
      if (!userExist) throw new Error("el user no existe");
      return true;
    })
];

export const validationUpdateProfile = [
  param("id")
    .notEmpty().withMessage("el id esta vacio")
    .isInt().withMessage("el id no es del tipo numerico"),
  body("first_name")
    .optional()
    .isString().withMessage("el first name no es del tipo string")
    .isLength({ min: 2, max: 50 }).withMessage("el first name debe tener entre 2 y 50 caracteres"),
  body("last_name")
    .optional()
    .isString().withMessage("el last name no es del tipo string")
    .isLength({ min: 2, max: 50 }).withMessage("el last name debe tener entre 2 y 50 caracteres"),
  body("biography")
    .optional()
    .isString().withMessage("la biografia no es del tipo string")
    .isLength({ max: 500 }).withMessage("la biografia debe tener como maximo 500 caracteres"),
  body("avatar_url")
    .optional()
    .isURL().withMessage("la url del avatar no es una URL valida"),
  body("birth_date")
    .optional()
    .isISO8601().withMessage("la fecha de cumpleaños no es una fecha valida"),
  body("user_id")
    .optional()
    .isInt({ min: 1 }).withMessage("el user_id debe ser un numero entero")
    .bail()
    .custom(async (id) => {
      const userExist = await UserModel.findByPk(id);
      if (!userExist) throw new Error("el user no existe");
      return true;
    })
];