import { Request, Response, NextFunction } from 'express';
import { verifyAsync } from '../utils/asyncJWT';
import { CustomRequest } from '../utils/customRequest.interface';

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const authMiddleware = async (request: Request, res: Response, next: NextFunction) => {
  const req = <CustomRequest>request;
  const accessToken = req.cookies.AT;  

  if (!accessToken) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = await verifyAsync(accessToken, JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
    return;
  }
};

export default authMiddleware;
