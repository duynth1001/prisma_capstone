import express from "express";
import {  deleteImages, getImages, postImages } from "../controllers/image.controller.js";
import { uploadCloud } from "../config/uploadCloud.js";
import { validatePostImages } from "../utils/validator.js";

const imageRoutes =express.Router();

//get images
imageRoutes.get('/get-images/:userId',getImages)

//delete images
imageRoutes.delete('/delete-images/:imageId',deleteImages)

//post image
imageRoutes.post('/post-images',uploadCloud.single('hinhAnh'),validatePostImages,postImages)
export default imageRoutes;