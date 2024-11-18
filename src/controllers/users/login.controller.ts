import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { z } from "zod"; 

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});


const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const { email, password } = validatedData;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // TODO: change this into opaque tokens
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("AT", token, {
        httpOnly: true,   
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict", 
        maxAge: 3600000,  // 1 hour
    });

    // TODO: implment refresh token

    return res.json({ message: "Login successful", token });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export default login;
