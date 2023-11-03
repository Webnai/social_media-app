import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

//defining the model for the notification table
const Notification = sequelize.define(
    "Notification",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        notification: {
            type: DataTypes.STRING(45),
            allowNull: false,
            required: [true, "Notification is required"],
        },
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }
);