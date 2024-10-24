import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { validationResult } from "express-validator";
const getImages = async(req,res)=>{
    try {
        let {userId}=req.params;
        let images = await prisma.hinh_anh.findMany({
            where:{
                nguoi_dung_id:Number(userId)
            }
        })
        if (images.length==0) {
            return res.status(400).json({message:"No images found"});
        }
        return res.status(200).json(images);    
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}

const deleteImages = async(req,res)=>{
    try {
        let{imageId}= req.params;
        let images =await prisma.hinh_anh.findFirst({
            where:{
                hinh_id:Number(imageId)
            }
        })
        if(!images)
        {
            return res.status(400).json({message:"Can't find image!"});
        }
        await prisma.hinh_anh.delete({
            where:{
                hinh_id:Number(imageId)
            }
        })
        return res.status(200).json({message:"Image deleted successfully!"})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}

const postImages = async(req,res)=>{
    try {
        const errors = validationResult(req);
    
        //validation check
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        let {nguoi_dung_id}=req.body;
        //check user in db
        let user = await prisma.nguoi_dung.findFirst({
            where:{
                nguoi_dung_id:Number(nguoi_dung_id)
            }
        })
        if (!user) {
            return res.status(400).json({message:"Can't find user!"});
        }
        //process image in hinh_anh db
        let {ten_hinh,mo_ta}=req.body;
        let imagePath=req.file;
        let newImage = await prisma.hinh_anh.create({
            data:{
                ten_hinh,
                duong_dan:imagePath.path,
                mo_ta,
                nguoi_dung_id:Number(user.nguoi_dung_id),
            }
        })
        return res.status(201).json(newImage);
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message:"Internal server error"})
    }
}

export {getImages,deleteImages,postImages}