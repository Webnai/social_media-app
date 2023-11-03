import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

//defining the model for the comment table
const Comment = sequelize.define(
    "Comment",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        comment: {
            type: DataTypes.STRING(45),
            allowNull: false,
            required: [true, "Comment is required"],
        },
    }
);

//defining Comment table associations
Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
    Comment.belongsTo(models.Post, {
        foreignKey: "postId",
        onDelete: "cascade",
    });
};

export default Comment;