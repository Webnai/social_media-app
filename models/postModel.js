import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

//defining the model for the post table
const Post = sequelize.define(
    "Post",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(45),
            allowNull: false,
            required: [true, "Title is required"],
        },
        content: {
            type: DataTypes.STRING(45),
            allowNull: false,
            required: [true, "Content is required"],
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: [true, "User ID is required"],
        },
    }
);

//defining Post table associations
Post.associate = (models) => {
    Post.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
    Post.hasMany(models.Comment, {
        foreignKey: "postId",
        onDelete: "cascade",
    });
    Post.hasMany(models.Like, {
        foreignKey: "postId",
        onDelete: "cascade",
    });
    Post.hasMany(models.Notification, {
        foreignKey: "postId",
        onDelete: "cascade",
    });
};

export default Post;