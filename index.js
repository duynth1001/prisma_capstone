import express  from "express";
import rootRoutes from "./src/routes/root.router.js";

const app = express();

//read josn file
app.use(express.json());

//mount rootRoutes
app.use(rootRoutes);

app.listen('8080',()=>{
    console.log('Server start on port 8080');
})