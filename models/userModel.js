import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

//defining the model for the user table
const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
            required: [true, "Username is required"],
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            lowercase: true,
            required: [true, "Email is required"],
            unique: true,
            validate: {
                isEmail: {
                    msg: "Must be a valid email address",
                },
            },
        },
        password: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
    }
);

//defining User table associations
User.associate = (models) => {
    User.hasMany(models.Post, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
    User.hasMany(models.Comment, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
    User.hasMany(models.Like, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
    User.hasMany(models.Follow, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
    User.hasMany(models.Notification, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
    User.hasMany(models.Message, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
    User.hasMany(models.Chat, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
    User.hasMany(models.ChatUser, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
    User.hasMany(models.ChatMessage, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
};

export default User;