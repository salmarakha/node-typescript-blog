import { Request, Response } from 'express';
import { CustomRequest } from '../../utils/customRequest.interface';
import { paginationSchema, idSchema } from '../../utils/commonValidators';
import { prisma } from '../../server';

export const getPost = async (request: Request, res: Response): Promise<any> => {
    const req = <CustomRequest>request;
    const id = await idSchema.parseAsync(Number(req.params.id));
    
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post)
        return res.status(404).send("Post not found.");
    
    return res.json(post);
};

export const getPosts = async (req: Request, res: Response): Promise<any> => {
    const { o: offset, l: limit, s: search } = req.query;
    const pagination = await paginationSchema.parseAsync({ offset: Number(offset) || 0, limit: Number(limit) || 10, search });
    
    const post = await prisma.post.findMany({
        skip: pagination.limit * pagination.offset,
        take: pagination.limit,
        where: {
            OR: pagination.search? [
                { title: { contains: pagination.search, mode: "insensitive" } },
                { content: { contains: pagination.search, mode: "insensitive" } },
            ] : undefined
        }
    });
    return res.json(post);
};
  
  