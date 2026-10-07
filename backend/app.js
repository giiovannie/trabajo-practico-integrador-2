import express from "express"
import "./src/Models/index.js"
import dotenv from "dotenv"
import { DataBaseUp } from "./src/config/DataBase.js"
import { UserRoutes } from "./src/Routes/user.routes.js"
import { TagRoutes } from "./src/Routes/tag.routes.js";
import { ArticleRoutes } from "./src/Routes/articles.routes.js";
import { AuthRoutes } from "./src/Routes/auth.routes.js";
import { ArticleTagRoutes } from "./src/Routes/article_tag.routes.js";

import cookieParser from "cookie-parser";

import { PerfilRouter } from "./src/Routes/profile.routes.js"
dotenv.config()


const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use(cookieParser());

app.use("/api", UserRoutes)
app.use("/api", PerfilRouter)
app.use("/api", TagRoutes)
app.use("/api", ArticleRoutes)
app.use("/api", ArticleTagRoutes)
app.use("/api", AuthRoutes)

app.listen(PORT, async()=>{
    try {
        await DataBaseUp()
        console.log(`Se ensendio el server correctamente en el puerto ${PORT}`);
    } catch (error) {
        console.log("lo sentimos pero ocurrio un error en ensender el server , toco reiniciar jiji :p");
    }
})