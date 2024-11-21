import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from '../../server';
import { loginSchema } from "./schemas";
import { signAsync } from "../../utils/asyncJWT";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = await loginSchema.parseAsync(req.body);
  console.log(email, password);
  
  const user = await prisma.user.findFirst({ where: { email: { equals: email, mode: 'insensitive' } }, });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // TODO: change this to opaque tokens instead
  const token = await signAsync({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

  res.cookie("AT", token, {
      httpOnly: true,   
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict", 
      maxAge: 3600000,  // 1 hour
  });

  // TODO: implment refresh token

  return res.json({ message: "Login successful", token });
};

export default login;
