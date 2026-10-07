import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config()

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql"
});

export const DataBaseUp = async()=>{
    try {
        await sequelize.sync({force: false});
        await sequelize.authenticate()
        console.log("la conexion con la base de datos fue exitosa :)");
    } catch (error) {
        console.log(error);
        console.log("lo sentimos la conexion con la base de datos fallo :c");
    }
}