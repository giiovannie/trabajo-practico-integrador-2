import { matchedData } from "express-validator";
import { UserModel } from "../Models/User.js";
import { ProfileModel } from "../Models/Profile.js";
import { hashPassword, comparePassword } from "../helpers/bcripts.helper.js";
import { generateToken, verifyToken } from "../helpers/jwt.helper.js";

export const register = async (req,res)=>{
  try {
    const data = matchedData(req);
    const { username, email, password, first_name, last_name, biography, avatar_url, birth_date } = data;
    const hashedPassword = await hashPassword(password);

    const userCreated = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role: "user"
    });

    await ProfileModel.create({
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date,
      user_id: userCreated.id
    });

    return res.status(201).json({message: "usuario registrado correctamente", user: userCreated});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};

export const login = async (req,res)=>{
  try {
    const { email, password } = matchedData(req);

    const user = await UserModel.findOne({ where: { email } });
    if(!user) return res.status(401).json({message: "credenciales incorrectas"});

    const passwordValid = await comparePassword(password, user.password);
    if(!passwordValid) return res.status(401).json({message: "credenciales incorrectas"});
    

    //ggeneramos el token 
    const token = generateToken({
      id: user.id,
      role: user.role
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 //esto equivale a una hora
    })
    return res.status(200).json({message: "login correcto"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};

export const logout = (req, res) => {
  res.clearCookie("token"); // Eliminar cookie del navegador
  return res.json({ message: "Logout exitoso" });
};

export const getProfile = async (req,res)=>{
  try {
    const user = await UserModel.findByPk(req.datosUserLog.id, {
      attributes: { exclude: ["password", "created_at", "updated_at", "deleted_at"] },
      include: {
        model: ProfileModel,
        as: "profile",
        attributes: { exclude: ["created_at", "updated_at"] }
      }
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};

export const updateProfile = async (req,res)=>{
  try {
    const data = matchedData(req);
    const profile = await ProfileModel.findOne({ where: { user_id: req.datosUserLog.id } });
    await profile.update(data);
    return res.status(200).json({message: "perfil actualizado correctamente", profile});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};