import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { z } from "zod"; 

const prisma = new PrismaClient();

const registerSchema = z.object({
  name: z.string().min(3, "Username should be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

const register = async (req: Request, res: Response): Promise<any> => {
    try {        
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
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
};

export default register;