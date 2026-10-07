import { verifyToken } from "../helpers/jwt.helper.js";


export const authMiddleware = (req,res,next)=>{
    try {
        //nota: se busca el token generado en el login ese token esta guardado bajo el nombre de "token"
        const tokenObtenido = req.cookies.token;
        if(!tokenObtenido) return res.status(401).json({ message: "No autenticado" });

        const decoded = verifyToken(tokenObtenido);

        //nota req es un objeto entre comilla usando la logica de crear nuevos atributo, añadimos al req un atributo con los datos del jwt obtenido que contenia el token
        req.datosUserLog = decoded

        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Error interno del servidor" });
    }
}