import UserController from '../controller/userController.js';
import express from 'express';
const router = express.Router();

// user routes
router.post('/register', UserController.registerUser);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/user/:id', UserController.getUser);
router.get('/users', UserController.getAllUsers);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);

export default router;