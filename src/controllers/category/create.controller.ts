import { Request, Response } from 'express';
import { CustomRequest } from '../../utils/customRequest.interface';
import { prisma } from '../../server';
import { categorySchema } from './schemas';

const createCategory = async (request: Request, res: Response): Promise<any> => {
    const req = <CustomRequest>request;
    const { name } = await categorySchema.parseAsync(req.body);
    const userId = req.user.id; 
  
    const category = await prisma.category.create({
      data: { name, userId }
    });
  
    return res.status(201).json(category);
};
  
export default createCategory;
  