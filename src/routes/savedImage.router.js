import express from "express";
import { getSavedImages } from "../controllers/savedImages.controller.js";
import { middlewareTokenAsyncKey } from "../config/jwt.js";

const savedImageRoute = express.Router();

//get saved images
savedImageRoute.get(
  "/get-saved-images/:userId",
  middlewareTokenAsyncKey,
  getSavedImages
);

export { savedImageRoute };
