import userModel from '../models/userModel.js';
import postModel from '../models/postModel.js';
import likeModel from '../models/likeModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';