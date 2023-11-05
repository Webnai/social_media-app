import UserService from '../service/userService.js';
import userModel from '../models/userModel.js';
import authSchema from '../validator/validator.js';

class UserController {
    // function to handle user registration
    static async registerUser(req, res, next) {
        try {
            const {username, email, password} = req.body;

            

             // check if user already exists
            const existingUser = await userModel.findOne({ where: email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // proceed to register user if input is valid
            const response = await UserService.registerUser(username, email, password);
            return res.status(201).json({message: 'user registered successfully', response});
        } catch (error) {
            next(error);
        }
    }

    // function to handle user login
    static async login(req, res, next) {
        try {
            const response = await UserService.login(req.body);
            return res.status(200).json({message: 'logged in successfully', response});
        } catch (error) {
            next(error);
        }
    }

    // function to handle user logout
    static async logout(req, res, next) {
        try {
            const response = await UserService.logout(req.body);
            return res.status(200).json({message: 'logged out successfully', response});
        } catch (error) {
            next(error);
        }
    }

    // function to handle get a user
    static async getUser(req, res, next) {
        try {
            const response = await UserService.getUser(req.body);
            return res.status(200).json({message: 'user retrieved successfully', response});
        } catch (error) {
            next(error);
        }
    }

    // function to handle get all users
    static async getAllUsers(req, res, next) {
        try {
            const response = await UserService.getAllUsers(req.body);
            return res.status(200).json({message: 'users retrieved successfully', response});
        } catch (error) {
            next(error);
        }
    }

    // function to handle update user
    static async updateUser(req, res, next) {
        try {
            const response = await UserService.updateUser(req.body);
            return res.status(200).json({message: 'user updated successfully', response});
        } catch (error) {
            next(error);
        }
    }

    // function to handle delete user
    static async deleteUser(req, res, next) {
        try {
            const response = await UserService.deleteUser(req.body);
            return res.status(200).json({message: 'user deleted successfully', response});
        } catch (error) {
            next(error);
        }
    }

    // function to handle user post
    static async userPost(req, res, next) {
        try {
            const response = await UserService.userPost(req.body);
            return res.status(201).json({message: 'post created successfully', response});
        } catch (error) {
            next(error);
        }
    }

};

export default UserController;