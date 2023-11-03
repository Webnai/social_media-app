import sequelize from './database/db.js';
import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

// initializing server to database connection
try {
    // await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
// (async () => {
//     await sequelize.sync();
// });