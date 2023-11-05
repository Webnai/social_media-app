import LikeService from "../service/likeService.js";

class LikeController {
    // function to handle create like
    static async createLike(req, res, next) {
        try {
        const response = await LikeService.createLike(req.body);
        return res.status(201).json({ message: "created successfully", response });
        } catch (error) {
        next(error);
        }
    }
    
    // function to handle get a like
    static async getLike(req, res, next) {
        try {
        const response = await LikeService.getLike(req.body);
        return res.status(200).json({ message: "like retrieved successfully", response });
        } catch (error) {
        next(error);
        }
    }

    // function to handle get all likes
    static async getAllLikes(req, res, next) {
        try {
        const response = await LikeService.getAllLikes(req.body);
        return res.status(200).json({ message: "likes retrieved successfully", response });
        } catch (error) {
        next(error);
        }
    }

    // function to handle delete like
    static async deleteLike(req, res, next) {
        try {
        const response = await LikeService.deleteLike(req.body);
        return res.status(200).json({ message: "like deleted successfully", response });
        } catch (error) {
        next(error);
        }
    }
}

export default LikeController;