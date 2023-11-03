import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

//defining the model for the like table
const Like = sequelize.define(
    "Like",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: [true, "User ID is required"],
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: [true, "Post ID is required"],
        },
    }
);

//defining Like table associations
Like.associate = (models) => {
    Like.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
    Like.belongsTo(models.Post, {
        foreignKey: "postId",
        onDelete: "cascade",
    });
};

export default Like;