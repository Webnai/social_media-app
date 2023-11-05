import PostController from "../controller/postController.js";
import express from "express";
const router = express.Router();

// post routes
router.post('/post', PostController.createPost);
router.get('/post/:id', PostController.getPost);
router.get('/posts', PostController.getAllPosts);
router.put('/post/:id', PostController.updatePost);
router.delete('/post/:id', PostController.deletePost);

export default router;