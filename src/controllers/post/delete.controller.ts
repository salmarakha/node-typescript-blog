import { Request, Response } from 'express';
import { CustomRequest } from '../../utils/customRequest.interface';import { idSchema } from '../../utils/commonValidators';
import { prisma } from '../../server';

const deletePost = async (request: Request, res: Response): Promise<any> => {
    const req = <CustomRequest>request;
    const id = await idSchema.parseAsync(Number(req.params.id));
    const userId = req.user.id;

    const post = await prisma.post.findUnique({ where: { id } });
    if (post?.authorId !== userId) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    await prisma.post.delete({ where: { id } });
    return res.status(204).send("Post deleted");
};
  
export default deletePost;
  