import { Request, Response } from 'express';
import { CustomRequest } from '../../utils/customRequest.interface';import { idSchema } from '../../utils/commonValidators';
import { prisma } from '../../server';

const deleteCategory = async (request: Request, res: Response): Promise<any> => {
    const req = <CustomRequest>request;
    const id = await idSchema.parseAsync(Number(req.params.id));
    const userId = req.user.id;

    const category = await prisma.category.findUnique({ where: { id } });
    if (category?.userId !== userId) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    await prisma.category.delete({ where: { id } });
    return res.status(204).send("Category Deleted");
};
  
export default deleteCategory;
  