import { Request, Response } from "express";

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie("AT", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return res.json({ message: "Logged out successfully" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export default login;
