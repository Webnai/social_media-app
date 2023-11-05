import  userRoutes from './routes/user.routes.js';
import  postRoutes from './routes/post.routes.js';
import  likeRoutes from './routes/like.routes.js';
import express from 'express';
import session from 'express-session';
import sequelize from './database/db.js';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use("/User", userRoutes);
app.use("/Post", postRoutes);    
app.use("/Like", likeRoutes);

// initializing server to database connection
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Move the sequelize.sync() call here
    await sequelize.sync();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}