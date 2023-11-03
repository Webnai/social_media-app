import Like from "../models/likeModel";
import Post from "../models/postModel";
import User from "../models/userModel";

class LikeService {
    // function to handle create like
    static async createLike(req, res, next) {
        try {
            // check if like already exists
            const likeExists = await Like.findOne({
                where: {
                    userId: req.user.id,
                    postId: req.params.id,
                },
            });
            if (likeExists) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Like already exists',
                });
            }
            // create new like
            const newLike = await Like.create({
                userId: req.user.id,
                postId: req.params.id,
            });
            // return like data
            return res.status(201).json({
                status: 'success',
                message: 'like created successfully',
                data: newLike,
            });
        } catch (error) {
            console.error(error);
        }
    }

    // function to handle get a like
    static async getLike(req, res, next) {
        try {
            // check if like exists
            const like = await Like.findOne({
                where: {
                    id: req.params.id,
                    include: User,
                },
            });
            if (!like) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Like not found',
                });
            }
            // return like data
            return res.status(200).json({
                status: 'success',
                message: 'like retrieved successfully',
                data: like,
            });
        } catch (error) {
            console.error(error);
        }
    }

    // function to handle get all likes
    static async getAllLikes(req, res, next) {
        try {
            // find all likes
            const likes = await Like.findAll({
                include: User,
                include: Post,
            });
            if (!likes) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Likes not found',
                });
            }
            // return all likes
            return res.status(200).json({
                status: 'success',
                message: 'likes retrieved successfully',
                data: likes,
            });
        } catch (error) {
            console.error(error);
        }
    }

    // function to handle delete like
    static async deleteLike(req, res, next) {
        try {
            // check if like exists
            const like = await Like.findOne({
                where: {
                    id: req.params.id,
                },
            });
            if (!like) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Like not found',
                });
            }
            // delete like data
            const deletedLike = await Like.destroy({
                where: {
                    id: req.params.id,
                },
            });
            // return like data
            return res.status(200).json({
                status: 'success',
                message: 'like deleted successfully',
                data: deletedLike,
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export default LikeService;