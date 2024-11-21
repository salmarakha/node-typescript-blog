import { Request, Response } from 'express';
import { CustomRequest } from '../../utils/customRequest.interface';
import { prisma } from '../../server';
import { tagSchema } from './schemas';

const createTag = async (request: Request, res: Response): Promise<any> => {
    const req = <CustomRequest>request;
    const { name } = await tagSchema.parseAsync(req.body);
    const userId = req.user.id; 
  
    const tag = await prisma.tag.create({
      data: { name, userId }
    });
  
    return res.status(201).json(tag);
};
  
export default createTag;
  