import express from "express";
import userRoutes from "./user.router.js";
import imageRoutes from "./image.router.js";
import { savedImageRoute } from "./savedImage.router.js";

//create global router
const rootRoutes = express.Router();

//mount user route
rootRoutes.use('/users',userRoutes)

//mount images route
rootRoutes.use('/images',imageRoutes)

//mount saved images route
rootRoutes.use('/saved-images',savedImageRoute)


export default rootRoutes;
