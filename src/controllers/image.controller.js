import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { validationResult } from "express-validator";

const getAllImages = async (req, res) => {
  try {
    const images = await prisma.hinh_anh.findMany();
    if (images.length === 0) {
      return res.status(404).json({ message: "No images found" });
    }
    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getSearchImages = async (req, res) => {
  try {
    const { ten_hinh } = req.query;

    if (!ten_hinh) {
      return res
        .status(400)
        .json({ message: "Please provide image name to search." });
    }

    const images = await prisma.hinh_anh.findMany({
      where: {
        ten_hinh: {
          contains: ten_hinh,
          mode: "insensitive",
        },
      },
    });

    if (images.length === 0) {
      return res.status(404).json({ message: "No images found" });
    }

    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getInfoImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const image = await prisma.hinh_anh.findFirst({
      where: {
        hinh_id: Number(imageId),
      },
      include: {
        nguoi_dung: true, 
      },
    });

    if (!image) {
      return res.status(404).json({ message: "Image not found!" });
    }

    return res.status(200).json({
      image: {
        ten_hinh: image.ten_hinh,
        duong_dan: image.duong_dan,
        mo_ta: image.mo_ta,
      },
      creator: {
        nguoi_dung_id: image.nguoi_dung.nguoi_dung_id,
        ho_ten: image.nguoi_dung.ho_ten,
        email: image.nguoi_dung.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getCommentImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const comments = await prisma.binh_luan.findMany({
      where: {
        hinh_id: Number(imageId),
      },
      include: {
        nguoi_dung: true,
      },
    });
    if (comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this image." });
    }
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getCheckImageSaved = async (req, res) => {
  try {
    const { imageId } = req.params;

    const image = await prisma.hinh_anh.findFirst({
      where: {
        hinh_id: Number(imageId),
      },
    });

    if (!image) {
      return res.status(404).json({ message: "Image has not been saved yet." });
    }

    return res.status(200).json({
      message: "Image has been saved.",
      image,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getImages = async (req, res) => {
  try {
    let { userId } = req.params;
    let images = await prisma.hinh_anh.findMany({
      where: {
        nguoi_dung_id: Number(userId),
      },
    });
    if (images.length == 0) {
      return res.status(400).json({ message: "No images found" });
    }
    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteImages = async (req, res) => {
  try {
    let { imageId } = req.params;
    let images = await prisma.hinh_anh.findFirst({
      where: {
        hinh_id: Number(imageId),
      },
    });
    if (!images) {
      return res.status(400).json({ message: "Can't find image!" });
    }
    await prisma.hinh_anh.delete({
      where: {
        hinh_id: Number(imageId),
      },
    });
    return res.status(200).json({ message: "Image deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postImages = async (req, res) => {
  try {
    const errors = validationResult(req);

    //validation check
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { nguoi_dung_id } = req.body;
    //check user in db
    let user = await prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: Number(nguoi_dung_id),
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Can't find user!" });
    }
    //process image in hinh_anh db
    let { ten_hinh, mo_ta } = req.body;
    let imagePath = req.file;
    let newImage = await prisma.hinh_anh.create({
      data: {
        ten_hinh,
        duong_dan: imagePath.path,
        mo_ta,
        nguoi_dung_id: Number(user.nguoi_dung_id),
      },
    });
    return res.status(201).json(newImage);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getImages,
  deleteImages,
  postImages,
  getAllImages,
  getSearchImages,
  getInfoImage,
  getCommentImage,
  getCheckImageSaved
};
