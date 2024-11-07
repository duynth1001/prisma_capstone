import { PrismaClient } from "@prisma/client";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { createRefToken, createToken, createTokenAsyncKey } from "../config/jwt.js";
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
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(mat_khau, 10);
    const nguoi_dung = await prisma.nguoi_dung.create({
      data: {
        email,
        mat_khau: hashedPassword,
        ho_ten,
        tuoi: Number(tuoi),
      },
    });
    return res
      .status(200)
      .json({ message: "Register successfully!", data: nguoi_dung });
  } catch (error) {
    console.log(error);
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

    const checkPass = await bcrypt.compareSync(mat_khau,user.mat_khau);
    if (!checkPass) {
      return res.status(400).json({ message: "Password is wrong" });
    }
    // create Token
    let payload = {
      userId:user.nguoi_dung_id
    };
    let accessToken = createTokenAsyncKey(payload);

    return res.status(200).json({
      message: "Login successfully",
      data: accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export { postRegister, postLogin };
