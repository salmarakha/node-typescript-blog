import { Request, Response } from 'express';
import { CustomRequest } from '../../utils/customRequest.interface';
import { prisma } from '../../server';
import { postSchema } from './schemas';

const createPost = async (request: Request, res: Response): Promise<any> => {
    const req = <CustomRequest>request;
    const { title, content, categoryId, tagIds } = await postSchema.parseAsync(req.body);
    const userId = req.user.id; 
  
    const post = await prisma.post.create({
      data: { 
        title: title, content: content, categoryId: categoryId, authorId: userId, 
        tags: {
          createMany: {
            data: tagIds.map(id => ({ tagId: id })),
            skipDuplicates: true
          }
        } 
      }
    });
  
    return res.status(201).json(post);
};
  
export default createPost;
  