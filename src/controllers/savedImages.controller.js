import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getSavedImages = async(req,res)=>{
    try {
    let {userId} =req.params;
    let images = await prisma.luu_anh.findMany({
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
export {getSavedImages}