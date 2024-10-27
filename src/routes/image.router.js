import express from "express";
import {
  deleteImages,
  getAllImages,
  getCheckImageSaved,
  getCommentImage,
  getImages,
  getInfoImage,
  getSearchImages,
  postImages,
} from "../controllers/image.controller.js";
import { uploadCloud } from "../config/uploadCloud.js";
import { validatePostImages } from "../utils/validator.js";
import { middlewareTokenAsyncKey } from "../config/jwt.js";

const imageRoutes = express.Router();
//get images
imageRoutes.get("/get-all-images", getAllImages);
//get search images
imageRoutes.get("/get-search-images", middlewareTokenAsyncKey, getSearchImages);
//get-info-image
imageRoutes.get(
  "/get-info-image/:imageId",
  middlewareTokenAsyncKey,
  getInfoImage
);
//get-commnet-image
imageRoutes.get(
  "/get-comment-image/:imageId",
  middlewareTokenAsyncKey,
  getCommentImage
);
//get-check-image-saved
imageRoutes.get(
  "/get-check-image-saved/:userId",
  middlewareTokenAsyncKey,
  getCheckImageSaved
);

//get image
imageRoutes.get("/get-images/:userId", middlewareTokenAsyncKey, getImages);

//delete images
imageRoutes.delete(
  "/delete-images/:imageId",
  middlewareTokenAsyncKey,
  deleteImages
);

//post image
imageRoutes.post(
  "/post-images",
  middlewareTokenAsyncKey,
  uploadCloud.single("hinhAnh"),
  validatePostImages,
  postImages
);
export default imageRoutes;
