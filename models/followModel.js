import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

//defining the model for the follow table
const Follow = sequelize.define(
    "Follow",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    }
);

//defining Follow table associations
Follow.associations = (models) => {
    Follow.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "cascade",
    });
    Follow.belongsTo(models.User, {
        foreignKey: "followerId",
        onDelete: "cascade",
    });
}

export default Follow;