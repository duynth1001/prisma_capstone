import { PrismaClient } from "@prisma/client";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { createRefToken, createToken } from "../config/jwt.js";
const prisma = new PrismaClient();

const postRegister = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    let { email, mat_khau, ho_ten, tuoi } = req.body;
    const userExist = await prisma.nguoi_dung.findFirst({
      where: {
        email,
      },
    });
    if (userExist) {
      return res.status(400).json({
        message: `Email already taken`,
        data: null,
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.nguoi_dung.create({
      data: {
        email,
        mat_khau: hashedPassword(mat_khau),
        ho_ten,
        tuoi: Number(tuoi),
      },
    });
    return res.status(200).json({ message: "Register successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const postLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { email, mat_khau } = req.body;

    const user = await prisma.nguoi_dung.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Email is wrong" });
    }
    let checkPass = bcrypt.compare(mat_khau, user.mat_khau);
    if (!checkPass) {
      return res.status(400).json({ message: "Password is wrong" });
    }
    // create Token
    let payload = {
      nguoi_dung_id: user.nguoi_dung_id,
    };
    let accessToken = createToken(payload);
    let refreshToken = createRefToken(payload);
    await prisma.nguoi_dung.update({
      where: { nguoi_dung_id }, // Sửa `user.user_id` thành `user.id`
      data: { refresh_token: refreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successfully",
      data: accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export { postRegister, postLogin };
