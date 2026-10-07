import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// funcion que genera el token que luego se va a usar en el controlador
export const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5h", // Token válido por 5 hora
      // expiresIn: process.env.JWT_EXPIRES, // Alternativa desde .env
    });
  } catch (error) {
    throw new Error("Error generando el token: " + error.message);
  }
};


//funcion que verfia el token generado en los controlladores
//nota: en los controladores se creeo
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Error verificando el token: " + error.message);
  }
};