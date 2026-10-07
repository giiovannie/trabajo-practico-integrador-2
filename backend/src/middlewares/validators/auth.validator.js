import { body } from "express-validator";
import { UserModel } from "../../Models/User.js";


//nota: esto valida lo que va a entrar en el register, que comparte user y profile en torno a sus atributos
export const validationRegister = [
  body("username")
    .notEmpty().withMessage("debe ingresar un nombre de usuario")
    .isAlphanumeric().withMessage("el nombre de usuario debe ser alfanumerico")
    .isLength({ min: 3, max: 20 }).withMessage("el nombre de usuario debe tener entre 3 y 20 caracteres")
    .bail()
    .custom(async (username) => {
      const userExist = await UserModel.findOne({ where: { username } });
      if(userExist) throw new Error("el nombre de usuario ya esta registrado");
      return true;
    }),
  body("email")
    .notEmpty().withMessage("debe ingresar un correo")
    .isEmail().withMessage("el correo ingresado no es valido")
    .bail()
    .custom(async (email) => {
      const userExist = await UserModel.findOne({ where: { email } });
      if(userExist) throw new Error("el correo ya esta registrado");
      return true;
    }),
  body("password")
    .notEmpty().withMessage("debe ingresar una contraseña")
    .isLength({ min: 8 }).withMessage("la contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/).withMessage("la contraseña debe contener una mayuscula")
    .matches(/[a-z]/).withMessage("la contraseña debe contener una minuscula")
    .matches(/[0-9]/).withMessage("la contraseña debe contener un numero"),
  body("first_name")
    .notEmpty().withMessage("debe ingresar un nombre")
    .isString().withMessage("el nombre debe ser texto")
    .isLength({ min: 2, max: 50 }).withMessage("el nombre debe tener entre 2 y 50 caracteres"),
  body("last_name")
    .notEmpty().withMessage("debe ingresar un apellido")
    .isString().withMessage("el apellido debe ser texto")
    .isLength({ min: 2, max: 50 }).withMessage("el apellido debe tener entre 2 y 50 caracteres"),
  body("biography")
    .optional()
    .isString().withMessage("la biografia debe ser texto")
    .isLength({ max: 500 }).withMessage("la biografia debe tener como maximo 500 caracteres"),
  body("avatar_url")
    .optional()
    .isURL().withMessage("la imagen debe ser una URL valida"),
  body("birth_date")
    .optional()
    .isISO8601().withMessage("la fecha de nacimiento no es valida")
];

export const validationLogin = [
  body("email")
    .notEmpty().withMessage("debe ingresar un correo")
    .isEmail().withMessage("el correo ingresado no es valido"),
  body("password")
    .notEmpty().withMessage("debe ingresar una contraseña")
];

//nota esto es para actualizar el profiule pero como el id viene de otro lado y no del params entonces es mejor crear uno similar pero sin el param
export const validationUpdateAuthProfile = [
  body("first_name")
    .optional()
    .isString().withMessage("el nombre debe ser texto")
    .isLength({ min: 2, max: 50 }).withMessage("el nombre debe tener entre 2 y 50 caracteres"),
  body("last_name")
    .optional()
    .isString().withMessage("el apellido debe ser texto")
    .isLength({ min: 2, max: 50 }).withMessage("el apellido debe tener entre 2 y 50 caracteres"),
  body("biography")
    .optional()
    .isString().withMessage("la biografia debe ser texto")
    .isLength({ max: 500 }).withMessage("la biografia debe tener como maximo 500 caracteres"),
  body("avatar_url")
    .optional()
    .isURL().withMessage("la imagen debe ser una URL valida"),
  body("birth_date")
    .optional()
    .isISO8601().withMessage("la fecha de nacimiento no es valida")
];