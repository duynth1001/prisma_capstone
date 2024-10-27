import express from "express";
import userRoutes from "./user.router.js";
import imageRoutes from "./image.router.js";
import { savedImageRoute } from "./savedImage.router.js";
import authRouter from "./auth.router.js";

//create global router
const rootRoutes = express.Router();

//mount auth route
rootRoutes.use('/auth',authRouter)

//mount user route
rootRoutes.use('/users',userRoutes)

//mount images route
rootRoutes.use('/images',imageRoutes)

//mount saved images route
rootRoutes.use('/saved-images',savedImageRoute)


export default rootRoutes;
