import { matchedData } from "express-validator";
import { UserModel } from "../Models/User.js";
import {ProfileModel} from "../Models/Profile.js"
import { ArticleModel } from "../Models/Article.js";

export const GetAllUsers = async (req,res)=>{
    try {
        const allUsers = await UserModel.findAll({
            attributes: { exclude: ["created_at", "updated_at", "deleted_at"] },
            include: {
                model: ProfileModel,
                as: "profile",
                attributes: { exclude: ["created_at", "updated_at"] }
            }
        })
        return res.status(200).json(allUsers)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "lo sentimos pero ocurrio un error inesperado"})
    }
}

export const GetUserById = async (req,res)=>{
    try {
        const { id } = matchedData(req)
        const userById = await UserModel.findOne({where: {id}, 
            attributes: { exclude: ["created_at", "updated_at", "deleted_at"] },
            include: [
                {
                model: ProfileModel,
                as: "profile",
                attributes: { exclude: ["created_at", "updated_at"] }
                },
                {
                model: ArticleModel,
                as: "articles",
                attributes: { exclude: ["created_at", "updated_at"] }
                }
            ]
        })
        return res.status(200).json(userById)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "lo sentimos pero ocurrio un error inesperado"})        
    }
}


export const updateUser = async(req,res)=>{
    try {
        const {id, ...datos} = matchedData(req)
        const user = await UserModel.findByPk(id)
        await user.update(datos)
        return res.status(200).json({message: "user actualizado correctamente", user})
    } catch (error) {
        return res.status(500).json({message: "lo sentimos pero ocurrio un error inesperado"})   
    }
}

export const deleteUser = async(req,res)=>{
    try {
        const {id} = matchedData(req)
        const userABorrar = await UserModel.findByPk(id)
        await userABorrar.destroy()
        return res.status(200).json({message: "el user fue borrado correctamente"})
    } catch (error) {
        return res.status(500).json({message: "lo sentimos pero ocurrio un error inesperado"})          
    }
}

export const crearUser = async(req,res)=>{
    try {
        const data = matchedData(req)
        const userCreated = await UserModel.create(data);
        return res.status(201).json(userCreated);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "lo sentimos pero ocurrio un error inesperado"})    
    }
}