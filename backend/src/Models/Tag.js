import { sequelize } from "../config/DataBase.js";
import datatypes from "sequelize";

export const TagModel = sequelize.define(
    "Tag",{
      name: {
        type: datatypes.STRING(30),
        allowNull: false,
        unique: true
      }
    },
    {
        created_at: "created_at",
        updated_at: "updated_at"
    }
);