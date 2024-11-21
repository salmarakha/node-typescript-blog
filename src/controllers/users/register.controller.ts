import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../server";
import { registerSchema } from "./schemas";

const register = async (req: Request, res: Response): Promise<any> => {
  const validatedData = registerSchema.parse(req.body);

  const { name, email, password } = validatedData;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return res.status(201).json({ message: "User registered successfully" });
};

export default register;