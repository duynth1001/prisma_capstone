import express from 'express'
import { getSavedImages } from '../controllers/savedImages.controller.js';

const savedImageRoute = express.Router();

//get saved images
savedImageRoute.get('/get-saved-images/:userId',getSavedImages)

export {savedImageRoute}