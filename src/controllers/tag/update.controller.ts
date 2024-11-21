import { Request, Response } from 'express';
import { CustomRequest } from '../../utils/customRequest.interface';import { idSchema } from '../../utils/commonValidators';
import { tagSchema } from './schemas';
import { prisma } from '../../server';

const updateTag = async (request: Request, res: Response): Promise<any> => {
    const req = <CustomRequest>request;
    const id = await idSchema.parseAsync(Number(req.params.id));
    const tagUpdates = await tagSchema.parseAsync(req.body);
    const userId = req.user.id;
  
    const tag = await prisma.tag.findUnique({ where: { id } });
    if (tag?.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
  
    const updatedTag = await prisma.tag.update({ where: { id }, data: tagUpdates });
  
    return res.json(updatedTag);
};
  
export default updateTag;
  