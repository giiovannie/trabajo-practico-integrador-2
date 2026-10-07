import { DataTypes } from 'sequelize';
import { sequelize } from '../config/DataBase.js';
import { UserModel } from './User.js';

export const ProfileModel = sequelize.define(
    'Profile', {
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        biography: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        avatar_url:{
            type: DataTypes.STRING(255),
            allowNull: true
        },
        birth_date:{
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        user_id:{
            type: DataTypes.INTEGER,
            unique: true,
            references: {
                model: UserModel,
                key: "id"
            }
        }
    },
    {
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});