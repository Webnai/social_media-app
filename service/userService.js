import sessionModel from '../models/sessionModel.js';
import User from '../models/userModel.js';
import postModel from '../models/postModel.js';
import jwt from 'jsonwebtoken';
class UserService {

    // function to handle user registration
    static async registerUser(username, email, password) {
        try {
            // create new user
            const newUser = await User.create({
                username,
                email,
                password,
            });
            return await newUser.save();
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    // function to handle user login
    static async login(req, res, next) {
        try {
            // check if user exists
            const user = await User.findOne({
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

            // create a session
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email,
            }

            // return user data
            return res.status(200).json({
                status: 'success',
                message: 'logged in successfully',
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    // function to handle user login
    static async login(req, res, next) {
        try {
            // check if user exists
            const user = await User.findOne({
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

            // create a session
            req.session.user ={
                id: user.id,
                username: user.username,
                email: user.email,
            }

            // function to handle forgot password
            async function forgotPassword(req, res, next) {
                try {
                    // check if user exists
                    const user = await User.findOne({
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
                    // generate temporary password
                    const tempPassword = generateTempPassword();
                    // update user password
                    await User.update(
                        {
                            password: tempPassword,
                        },
                        {
                            where: {
                                email: req.body.email,
                            },
                        }
                    );
                    // send temporary password to user's email
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.EMAIL,
                            pass: process.env.PASSWORD,
                        },
                    });
                    const mailOptions = {
                        from: process.env.EMAIL,
                        to: req.body.email,
                        subject: 'Temporary Password',
                        text: `Your temporary password is ${tempPassword}`,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    // return success message
                    return res.status(200).json({
                        status: 'success',
                        message: 'Temporary password sent successfully',
                    });
                } catch (error) {
                    console.error(error);
                }
            }

            // create session
            await sessionModel.create({
                userId: user.id,
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
            throw error;
        }
    }

    // function to handle user logout
    static async logout(req, res, next) {
        try {
            // get the user's token from the session
            const token = req.session.token;
    
            // decode the token to get the user's ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;
    
            // find the user with the ID
            const user = await User.findOne({
                where: {
                    id: userId,
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
    
            // remove the token from the session
            delete req.session.token;
    
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
            const user = await User.findOne({
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
            const users = await User.findAll();
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
            const user = await User.findOne({
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
            const updatedUser = await User.update({
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
            const user = await User.findOne({
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
            const deletedUser = await User.destroy({
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

    // function to handle user Post
    static async userPost(req, res, next) {
        try {
            // find user
            const user = await User.findOne({ where: { id: req.params.id } });

            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found',
                });
            }

            // find user's posts
            const posts = await postModel.findAll({ where: { userId: user.id } });

            // return user's posts
            return res.status(200).json({
                status: 'success',
                message: 'User posts retrieved successfully',
                data: posts,
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}

export default UserService;