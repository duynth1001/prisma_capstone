import express from 'express'
import { getUserInfo, postComment, putUser } from '../controllers/user.controller.js';
import { uploadCloud } from '../config/uploadCloud.js';
import {  validatePostComment, validatePutUser } from '../utils/validator.js';
import { middlewareTokenAsyncKey } from '../config/jwt.js';

const userRoutes = express.Router();

//post comment with or without image
userRoutes.post('/post-comment',middlewareTokenAsyncKey,uploadCloud.single('hinhAnh'),validatePostComment, postComment)

//get user info
userRoutes.get('/get-users-info',middlewareTokenAsyncKey,getUserInfo)

//update user
userRoutes.put('/put-user',middlewareTokenAsyncKey,uploadCloud.single('hinhAnh'),validatePutUser,putUser);
export default userRoutes;