import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.HOST,
        dialect: "mysql",
        logging: false,
    }
);

export default sequelize;