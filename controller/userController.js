import UserService from '../service/userService.js';

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

    // function to handle get a user
    static async getUser(req, res, next) {
        try {
            const response = await UserService.getUser(req.body);
            return res.status(200).json({message: 'user retrieved successfully', response});
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