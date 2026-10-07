import { ArticleModel } from "../Models/Article.js";


//nota: aca el owner solo verifica que el el dueño del articulo sea el mismo que esta en la cookie
export const ownerMiddleware = async (req,res,next)=>{
  try {
    const { id } = req.params;
    const article = await ArticleModel.findByPk(id);
    if(!article) return res.status(404).json({message: "el articulo no existe"});

    const userId = req.datosUserLog.id;
    const role = req.datosUserLog.role;

    if(article.user_id !== userId && role !== "admin") return res.status(403).json({message: "no tenes permisos para realizar esta accion"});
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({message: "lo sentimos hubo un error en el ownerMiddleware"});
  }
};