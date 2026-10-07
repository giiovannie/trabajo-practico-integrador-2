import { sequelize } from "../config/DataBase.js";
import {DataTypes} from "sequelize";
import { ArticleModel } from "./Article.js";
import { TagModel } from "./Tag.js";

export const ArticleTagModel = sequelize.define(
    "Article_Tag",
    {
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ArticleModel,
                key: "id"
            }
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: TagModel,
                key: "id",
            }
        }
    },
    {
    createdAt: "created_at",
    updatedAt: "updated_at",
    onDelete: "CASCADE"
    }
)