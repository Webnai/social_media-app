import PostService from '../service/postService.js';

class PostController {
    // function to handle create post
    static async createPost(req, res, next) {
        try {
            const response = await PostService.createPost(req.body);
            return res.status(201).json({message: 'post created successfully', response});
        } catch (error) {
            next(error);
        }
    }

    // function to handle get a post
    static async getPost(req, res, next) {
        try {
            const response = await PostService.getPost(req.body);
            return res.status(200).json({message: 'post retrieved successfully', response});
        } catch (error) {
            next(error);
        }
    }

    // function to handle get all posts
    static async getAllPosts(req, res, next) {
        try {
            const response = await PostService.getAllPosts(req.body);
            return res.status(200).json({message: 'posts retrieved successfully', response});
        } catch (error) {
            next(error);
        }
    }

    // function to handle update post
    static async updatePost(req, res, next) {
        try {
            const response = await PostService.updatePost(req.body);
            return res.status(200).json({message: 'post updated successfully', response});
        } catch (error) {
            next(error);
        }
    }

    // function to handle delete post
    static async deletePost(req, res, next) {
        try {
            const response = await PostService.deletePost(req.body);
            return res.status(200).json({message: 'post deleted successfully', response});
        } catch (error) {
            next(error);
        }
    }
}

export default PostController;