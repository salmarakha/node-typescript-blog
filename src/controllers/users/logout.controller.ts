import { Request, Response } from "express";

const login = async (req: Request, res: Response): Promise<any> => {
  res.clearCookie("AT", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
  });

  return res.json({ message: "Logged out successfully" });
};

export default login;
