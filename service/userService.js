import sessionModel from '../models/sessionModel.js';
import userModel from '../models/userModel.js';
import postModel from '../models/postModel.js';
import jwt from 'jsonwebtoken';
class UserService {

    // function to handle user registration
    static async register(req, res, next) {
        try {
            // check if user already exists
            const userExists = await userModel.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (userExists) {
                return res.status(400).json({
                    status: 'error',
                    message: 'User already exists',
                });
            }
            // create new user
            const newUser = await userModel.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });
            // generate token
            const token = jwt.sign(
                {
                    id: newUser.id,
                    email: newUser.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    // function to handle user login
    static async login(req, res, next) {
        try {
            // check if user exists
            const user = await userModel.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid credentials',
                });
            }
            // check if password is correct
            const isPasswordCorrect = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!isPasswordCorrect) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid credentials',
                });
            }
            // generate token
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                }
            );

            // create session
            await sessionModel.create({
                userId: user.id,
                token,
            });

            // return user data
            return res.status(200).json({
                status: 'success',
                message: 'logged in successfully',
                token,
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    // function to handle user logout
    static async logout(req, res, next) {
        try {
            // check if user logged in
            const user = await userModel.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (!user) {
                throw new Error('User not found');
            }

            // delete user's session from the database
            await sessionModel.destroy({
                where: {
                    userId: user.id,
                },
            });

            return res.status(200).json({ message: 'User logged out successfully' });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    // function to handle get a user
    static async getUser(req, res, next) {
        try {
            // check if user exists
            const user = await userModel.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'User not found',
                });
            }
            // return user data
            return res.status(200).json({
                status: 'success',
                message: 'user retrieved successfully',
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    //function to handle get all users
    static async getAllUsers(req, res, next) {
        try {
            // check if user exists
            const users = await userModel.findAll();
            if (!users) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Users not found',
                });
            }
            // return user data
            return res.status(200).json({
                status: 'success',
                message: 'users retrieved successfully',
                data: users,
            });
        } catch (error) {
            console.error(error);
        }
    }

    //function to handle update user
    static async updateUser(req, res, next) {
        try {
            // check if user exists
            const user = await userModel.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'User not found',
                });
            }
            // update user data
            const updatedUser = await userModel.update({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            }, {
                where: {
                    email: req.body.email,
                },
            });
            // return user data
            return res.status(200).json({
                status: 'success',
                message: 'user updated successfully',
                data: updatedUser,
            });
        } catch (error) {
            console.error(error);
        }
    }

    //function to handle delete user
    static async deleteUser(req, res, next) {
        try {
            // check if user exists
            const user = await userModel.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'User not found',
                });
            }
            // delete user data
            const deletedUser = await userModel.destroy({
                where: {
                    email: req.body.email,
                },
            });
            // return user data
            return res.status(200).json({
                status: 'success',
                message: 'user deleted successfully',
                data: deletedUser,
            });
        } catch (error) {
            console.error(error);
        }
    }

    //function to handle user Post
    static async userPost(req, res, next) {
        try {
            // check if user exists
            const user = await userModel.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'User not found',
                });
            }
            // create user post
            const post = postModel.findAll({ where: { userId: user.id } });
            post = await postModel.create({
                title: req.body.title,
                body: req.body.body,
                userId: user.id,
            });
            // return user data
            return res.status(200).json({
                status: 'success',
                message: 'user post created successfully',
                data: userPost,
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export default UserService;