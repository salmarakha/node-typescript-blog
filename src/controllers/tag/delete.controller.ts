import { Request, Response } from 'express';
import { CustomRequest } from '../../utils/customRequest.interface';import { idSchema } from '../../utils/commonValidators';
import { prisma } from '../../server';

const deleteTag = async (request: Request, res: Response): Promise<any> => {
    const req = <CustomRequest>request;
    const id = await idSchema.parseAsync(Number(req.params.id));
    const userId = req.user.id;

    const tag = await prisma.tag.findUnique({ where: { id } });
    if (tag?.userId !== userId) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    await prisma.tag.delete({ where: { id } });
    return res.status(204).send("Tag Deleted");
};
  
export default deleteTag;
  