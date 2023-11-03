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

    //function to handle get all posts
    static async getAllPosts(req, res, next) {
        try {
            // find all posts
            const posts = await Post.findAll({
                include: User,
                include: Like,
                include: Comment,
            });
            if (!posts) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Posts not found',
                });
            }
            // return all posts
            return res.status(200).json({
                status: 'success',
                message: 'posts retrieved successfully',
                data: posts,
            });
        } catch (error) {
            console.error(error);
        }
    }

    // function to handle update post
    static async updatePost(req, res, next) {
        try {
            // check if post exists
            const post = await Post.findOne({
                where: {
                    id: req.params.id,
                },
            });
            if (!post) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Post not found',
                });
            }
            // update post
            const updatedPost = await Post.update({
                title: req.body.title,
                content: req.body.content,
            }, {
                where: {
                    id: req.params.id,
                },
            });
            if (!updatedPost) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Post not updated',
                });
            }
            // return updated post
            return res.status(200).json({
                status: 'success',
                message: 'post updated successfully',
                data: updatedPost,
            });
        } catch (error) {
            console.error(error);
        }
    }

    //function to handle delete post
    static async deletePost(req, res, next) {
        try {
            // check if post exists
            const post = await Post.findOne({
                where: {
                    id: req.params.id,
                },
            });
            if (!post) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Post not found',
                });
            }
            // delete post
            const deletedPost = await Post.destroy({
                where: {
                    id: req.params.id,
                },
            });
            if (!deletedPost) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Post not deleted',
                });
            }
            // return deleted post
            return res.status(200).json({
                status: 'success',
                message: 'post deleted successfully',
                data: deletedPost,
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export default PostService;