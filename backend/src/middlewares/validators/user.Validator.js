import { UserModel } from "../../Models/User.js";
import { body, param } from "express-validator";

//esto se usa para buscar por id y para borrar por id
export const validationUserByid = [ 
    param("id")
        .notEmpty().withMessage("el id esta vacio")
        .isInt().withMessage("el id no es del tipo numerico")
        .bail()
        .custom(async (id)=>{
            const userExist = await UserModel.findByPk(id);
            if (!userExist) throw new Error("el user no existe")
            return true;
        })
]

export const validationCreateUser = [
    body("username")
        .notEmpty().withMessage("el username esta vacio")
        .isString().withMessage("el username no es del tipo string")
        .isLength({ min: 3, max: 20 }).withMessage("el username debe tener entre 3 y 20 caracteres"),
    body("email")
        .notEmpty().withMessage("el email esta vacio")
        .isEmail().withMessage("el email no es del tipo email"),
    body("password")
        .notEmpty().withMessage("el password esta vacio")
        .isString().withMessage("el password no es del tipo string")
        .isLength({min: 8}).withMessage("el password debe tener al menos 8 caracteres"),
    body("role")
        .notEmpty().withMessage("el role esta vacio")
        .isIn(["admin", "user"]).withMessage("el role no es valido") //nota para mi: se puede usar isIn para validar que el valor este dentro de un array de valores permitidos
]

export const validationUpdateUser = [
    param("id")
        .isInt().withMessage("el id no es del tipo numerico")
        .notEmpty().withMessage("el id esta vacio"),
    body("username")
        .optional()
        .isString().withMessage("el username no es del tipo string"),
    body("email")
        .optional()
        .isEmail().withMessage("el email no es del tipo email"),
    body("password")
        .optional()
        .isString().withMessage("el password no es del tipo string")
        .isLength({min: 8}).withMessage("el password debe tener al menos 8 caracteres"),
    body("role")
        .optional()
        .isIn(["admin", "user"]).withMessage("el role no es valido")
]
