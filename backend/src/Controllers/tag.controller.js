import { matchedData } from "express-validator";
import { TagModel } from "../Models/Tag.js";
import { ArticleModel } from "../Models/Article.js";

export const getAllTags = async (req,res)=>{
  try {
    const tags = await TagModel.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: ArticleModel,
        as: "articles",
        attributes: { exclude: ["created_at", "updated_at"] },
        through: {
          attributes: []
        }
      }
    });
    return res.status(200).json(tags);
  } catch (error) {
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};

export const getTagById = async (req,res)=>{
  try {
    const { id } = matchedData(req);
    const tag = await TagModel.findOne({
      where: {id},
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: ArticleModel,
        as: "articles",
        attributes: { exclude: ["created_at", "updated_at"] },
        through: {
          attributes: []
        }
      }
    });
    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};

export const createTag = async (req,res)=>{
  try {
    const data = matchedData(req);
    const tagCreated = await TagModel.create(data);
    return res.status(201).json(tagCreated);
  } catch (error) {
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};

export const updateTag = async (req,res)=>{
  try {
    const { id, ...data } = matchedData(req);
    const tag = await TagModel.findByPk(id);
    await tag.update(data);
    return res.status(200).json({message: "la etiqueta fue actualizada correctamente"});
  } catch (error) {
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};

export const deleteTag = async (req,res)=>{
  try {
    const { id } = matchedData(req);
    const tag = await TagModel.findByPk(id);
    await tag.destroy();
    return res.status(200).json({message: "la etiqueta fue eliminada correctamente"});
  } catch (error) {
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};