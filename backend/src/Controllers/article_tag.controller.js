import { matchedData } from "express-validator";

import { ArticleTagModel } from "../Models/Article_Tag.js";
import { ArticleModel } from "../Models/Article.js";

export const createArticleTag = async (req,res)=>{
  try {
    const data = matchedData(req);

    const article = await ArticleModel.findByPk(data.article_id);

    if(article.user_id !== req.datosUserLog.id) {
      return res.status(403).json({message: "no tenes permisos para modificar este articulo"});
    }

    const relationCreated = await ArticleTagModel.create(data);

    return res.status(201).json(relationCreated);

  } catch (error) {
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};

export const deleteArticleTag = async (req,res)=>{
  try {
    const { articleTagId } = matchedData(req);

    const relation = await ArticleTagModel.findByPk(articleTagId);

    const article = await ArticleModel.findByPk(relation.article_id);

    if(article.user_id !== req.datosUserLog.id) {
      return res.status(403).json({message: "no tenes permisos para modificar este articulo"});
    }

    await relation.destroy();

    return res.status(200).json({message: "la relacion fue eliminada correctamente"});

  } catch (error) {
    return res.status(500).json({message: "lo sentimos ocurrio un error inesperado"});
  }
};