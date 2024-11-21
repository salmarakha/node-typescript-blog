import { Request, Response } from 'express';
import { CustomRequest } from '../../utils/customRequest.interface';import { idSchema } from '../../utils/commonValidators';
import { postSchema } from './schemas';
import { prisma } from '../../server';

const updatePost = async (request: Request, res: Response): Promise<any> => {
    const req = <CustomRequest>request;
    const id = await idSchema.parseAsync(Number(req.params.id));
    const { tagIds, ...postUpdates} = await postSchema.partial().parseAsync(req.body);
    const userId = req.user.id;
  
    const post = await prisma.post.findUnique({ where: { id } });
    if (post?.authorId !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
  
    const updatedPost = await prisma.post.update({ where: { id }, data: { 
      ...postUpdates,
        tags: {
         
        }
      } 
    });
  
    return res.json(updatedPost);
};
  
export default updatePost;
  