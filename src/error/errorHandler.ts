import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  message: string;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  console.error(err); 

  const statusCode = err.statusCode || 500; 
  const message = err.message || 'Internal Server Error'; 

  res.status(statusCode).json({ status: 'error', message: message });
};

export default errorHandler;
