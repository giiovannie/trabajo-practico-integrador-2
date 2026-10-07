import { sequelize } from "../config/DataBase.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./User.js";

export const ArticleModel = sequelize.define(
    'Article', {
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        excerpt: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('published', 'archived'),
            defaultValue: 'published',
            allowNull: false
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: UserModel,
                key: "id"
            }
        }
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        onDelete: "CASCADE"
    }
);