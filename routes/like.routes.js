import LikeController from "../controller/likeController.js";
import express from "express";
const router = express.Router();

// like routes
router.post('/like', LikeController.createLike);
router.get('/like/:id', LikeController.getLike);
router.get('/likes', LikeController.getAllLikes);
router.delete('/like/:id', LikeController.deleteLike);

export default router;