import { matchedData } from "express-validator";
import { ArticleModel } from "../Models/Article.js";
import { UserModel } from "../Models/User.js";
import { TagModel } from "../Models/Tag.js";

export const getAllArticles = async (req,res)=>{
  try {
    const articles = await ArticleModel.findAll({
      attributes: { exclude: ["created_at", "updated_at"] },
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: { exclude: ["password", "created_at", "updated_at", "deleted_at"] }
        },
        {
          model: TagModel,
          as: "tags",
          attributes: { exclude: ["created_at", "updated_at"] },
          through: {
            attributes: []
          }
        }
      ]
    });
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};

export const getArticleById = async (req,res)=>{
  try {
    const { id } = matchedData(req);
    const article = await ArticleModel.findOne({
      where: {id},
       attributes: { exclude: ["created_at", "updated_at"] },
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: { exclude: ["password", "created_at", "updated_at", "deleted_at"] }
        },
        {
          model: TagModel,
          as: "tags",
          attributes: { exclude: ["created_at", "updated_at"] },
          through: {
         attributes: []
      }
        }
      ]
    });
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};

export const createArticle = async (req,res)=>{
  try {
    const data = matchedData(req);
    const articleCreated = await ArticleModel.create(data);
    return res.status(201).json(articleCreated);
  } catch (error) {
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};

export const updateArticle = async (req,res)=>{
  try {
    const { id, ...data } = matchedData(req);
    const article = await ArticleModel.findByPk(id);
    await article.update(data);
    return res.status(200).json({message: "el articulo fue actualizado correctamente"});
  } catch (error) {
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};

export const deleteArticle = async (req,res)=>{
  try {
    const { id } = matchedData(req);
    const article = await ArticleModel.findByPk(id);
    await article.destroy();
    return res.status(200).json({message: "el articulo fue eliminado correctamente"});
  } catch (error) {
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};

//pregguntar dsp lo de abajo
export const getMyArticles = async(req,res)=>{
  try {
    const articles = await ArticleModel.findAll({
      where: {
        user_id: req.datosUserLog.id,
        status: "published"
      }
    });

    return res.status(200).json(articles);
  } catch(error) {
    console.log(error.message);
    return res.status(500).json({message: "error al obtener los articulos"});
  }
};

export const getMyArticleById = async(req,res)=>{
  try {
    const { id } = req.params;

    const article = await ArticleModel.findOne({
      where: {
        id,
        user_id: req.datosUserLog.id
      }
    });

    if(!article) return res.status(404).json({message: "articulo no encontrado"});

    return res.status(200).json(article);
  } catch(error) {
    console.log(error.message);
    return res.status(500).json({message: "error al obtener el articulo"});
  }
};