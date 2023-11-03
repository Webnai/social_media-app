import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

//defining the model for the message table
const Message = sequelize.define(
    "Message",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        message: {
            type: DataTypes.STRING(45),
            allowNull: false,
            required: [true, "Message is required"],
        },
    }
);

//defining Message table associations
Message.associations = (models) => {
    Message.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
    Message.belongsTo(models.Chat, {
        foreignKey: "chatId",
        onDelete: "cascade",
    });
}

export default Message;