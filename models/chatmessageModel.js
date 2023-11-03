import sequelize from "../database/db.js";
import { DataType } from "sequelize";

//defining the model for the Chatmessage table
const Chatmessage = sequelize.define(
    "Chatmessage",
    {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        chatmessage: {
            type: DataType.STRING(45),
            allowNull: false,
            required: [true, "Chatmessage is required"],
        },
    }
);

//defining Chatmessage table associations
Chatmessage.associate = (models) => {
    Chatmessage.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
    Chatmessage.belongsTo(models.Chat, {
        foreignKey: "chatId",
        onDelete: "cascade",
    });
};

export default Chatmessage;