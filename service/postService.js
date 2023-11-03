import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Like from "../models/likeModel.js";
import Comment from "../models/commentModel.js";
import Notification from "../models/notificationModel.js";

class PostService {
    
    // function to handle create post
    static async createPost(req, res, next) {
        try {
            // check if post already exists
            const postExists = await Post.findOne({
                where: {
                    title: req.body.title,
                    content: req.body.content,
                },
            });
            if(postExists) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Post already exists',
                });
            }
            // create new post
            const newPost = await Post.create({
                title: req.body.title,
                content: req.body.content,
                userId: req.user.id,
            });
            // create new notification
            const newNotification = await Notification.create({
                type: 'post',
                userId: req.user.id,
                postId: newPost.id,
            });
            return newPost;
        } catch (error) {
            console.error(error);
        }
    }

    // function to handle get a post
    static async getPost(req, res, next) {
        try {
            // check if post exists
            const post = await Post.findOne({
                where: {
                    id: req.params.id,
                    include: User,
                },
            });
            if (!post) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Post not found',
                });
            }
            // return post data
            return res.status(200).json({
                status: 'success',
                message: 'post retrieved successfully',
                data: post,
            });
        } catch (error) {
            console.error({ message: "server error", error});
        }
    }
}