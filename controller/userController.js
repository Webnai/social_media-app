import userModel from '../models/userModel.js';
import UserService from '../service/userService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

import UserService from '../services/userService.js';

class UserController {
    // function to handle user registration
    static async register(req, res, next) {
        try {
            const response = await UserService.register(req.body);
            return res.status(201).json({message: 'created successfully', response});
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
};

export default UserController;