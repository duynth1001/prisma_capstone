import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { validationResult } from "express-validator";
const postComment = async (req, res) => {
  try {
    //validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //destruct req body
    const { nguoi_dung_id, noi_dung } = req.body;

    //check if comment include image
    let image = req.file;
    
    //if yes check image first and then comment
    if (image) {
      let newImage = await prisma.hinh_anh.create({
        data: {
          ten_hinh: image.filename,
          duong_dan: image.path,
          nguoi_dung_id: Number(nguoi_dung_id),
        },
      });
      let imageID = newImage.hinh_id;
      let newComment = await prisma.binh_luan.create({
        data: {
          nguoi_dung_id: Number(nguoi_dung_id),
          hinh_id: imageID,
          ngay_binh_luan: new Date(),
          noi_dung,
        },
      });
      return res.status(201).json(newComment);
    }
    //if not image include in the comment
    else {
      let newComment = await prisma.binh_luan.create({
        data: {
          nguoi_dung_id: Number(nguoi_dung_id),
          ngay_binh_luan: new Date(),
          noi_dung,
        },
      });
      return res.status(201).json(newComment);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserInfo = async (req,res)=>{
  try {
    let user = await prisma.nguoi_dung.findMany();
    if (!user) {
      return res.status(400).json({message:"User not found"});
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({message:"Internal server error"})
  }
}

const putUser = async(req,res)=>{
  try {
    //validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let{
      nguoi_dung_id,
      email,
      mat_khau,
      ho_ten,
      tuoi,
    }=req.body
    let avatarPath = req.file;
    const user = await prisma.nguoi_dung.findFirst({
      where:{
        nguoi_dung_id:Number(nguoi_dung_id)
      }
    })
    if(!user)
    {
      return res.status(400).json({message:"Can't find user"});
    }
    await prisma.nguoi_dung.update({
      data:{
        email,
        mat_khau,
        ho_ten,
        tuoi:Number(tuoi),
        anh_dai_dien:avatarPath.path,
      },
      where:{nguoi_dung_id:Number(nguoi_dung_id)}
    })
    return res.status(200).json({message:"Update user successfully!"})
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({message:"Internal server error"})
  }
}

export { postComment,getUserInfo ,putUser};
