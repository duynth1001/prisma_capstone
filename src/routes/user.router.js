import express from 'express'
import { getUserInfo, postComment, putUser } from '../controllers/user.controller.js';
import { uploadCloud } from '../config/uploadCloud.js';
import {  validatePostComment, validatePutUser } from '../utils/validator.js';

const userRoutes = express.Router();

//post comment with or without image
userRoutes.post('/post-comment',uploadCloud.single('hinhAnh'),validatePostComment, postComment)

//get user info
userRoutes.get('/get-users-info',getUserInfo)

//update user
userRoutes.put('/put-user',uploadCloud.single('hinhAnh'),validatePutUser,putUser);
export default userRoutes;