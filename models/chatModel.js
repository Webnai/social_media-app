import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

//defining the model for the chat table
const Chat = sequelize.define(
    "Chat",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        chat: {
            type: DataTypes.STRING(45),
            allowNull: false,
            required: [true, "Chat is required"],
        },
    }
);

//defining Chat table associations
Chat.associate = (models) => {
    Chat.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
    Chat.belongsTo(models.Post, {
        foreignKey: "postId",
        onDelete: "cascade",
    });
};

export default Chat;