import { TagModel } from "../../Models/Tag.js"
import { param, body } from "express-validator"

export const tagValidatorCreate = [
    body("name")
        .notEmpty().withMessage("el nombre de la etiqueta esta vacio")
        .isString().withMessage("el nombre no es del tipo string")
        .isLength({min: 2, max: 30})
        .matches(/^\S+$/).withMessage("el nombre no puede contener espacios")
        .bail()
        .custom(async (name)=>{
            const nameTag = await TagModel.findOne({where: {name}})
            if (nameTag) throw new Error("ya existe ese nombre ")
                return true
        })
]

export const validationTagById = [
  param("id")
    .notEmpty().withMessage("debe ingresar un identificador")
    .isInt().withMessage("el identificador debe ser numerico")
    .bail()
    .custom(async (id) => {
      const tagExist = await TagModel.findByPk(id);
      if (!tagExist) throw new Error("no se encontro la etiqueta solicitada");
      return true;
    })
];

export const validationUpdateTag = [
  param("id")
    .notEmpty().withMessage("debe ingresar un identificador")
    .isInt().withMessage("el identificador debe ser numerico")
    .bail()
    .custom(async (id) => {
      const tagExist = await TagModel.findByPk(id);
      if (!tagExist) throw new Error("no se encontro la etiqueta solicitada");
      return true;
    }),
  body("name")
    .optional()
    .isString().withMessage("el nombre ingresado debe ser texto")
    .isLength({ min: 2, max: 30 }).withMessage("el nombre debe contener entre 2 y 30 caracteres")
    .matches(/^\S+$/).withMessage("el nombre no puede contener espacios")
    .bail()
    .custom(async (name, { req }) => {
      const tagExist = await TagModel.findOne({ where: { name } });
      if (tagExist && tagExist.id !== Number(req.params.id)) throw new Error("ya existe una etiqueta con ese nombre"); //nota a recordar: esto permite que el id que viene por params es del string se compare si es igual al que esta en la bd
      return true;
    })
];