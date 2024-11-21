import { Request, Response } from 'express';
import { CustomRequest } from '../../utils/customRequest.interface';import { idSchema } from '../../utils/commonValidators';
import { categorySchema } from './schemas';
import { prisma } from '../../server';

const updateCategory = async (request: Request, res: Response): Promise<any> => {
    const req = <CustomRequest>request;
    const id = await idSchema.parseAsync(Number(req.params.id));
    const categoryUpdates = await categorySchema.parseAsync(req.body);
    const userId = req.user.id;
  
    const category = await prisma.category.findUnique({ where: { id } });
    if (category?.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
  
    const updatedCategory = await prisma.category.update({ where: { id }, data: categoryUpdates });
  
    return res.json(updatedCategory);
};
  
export default updateCategory;
  