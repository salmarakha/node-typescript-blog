import { Request, Response } from 'express';
import { CustomRequest } from '../../utils/customRequest.interface';
import { paginationSchema, idSchema } from '../../utils/commonValidators';
import { prisma } from '../../server';

export const getCategory = async (request: Request, res: Response): Promise<any> => {
    const req = <CustomRequest>request;
    const id = await idSchema.parseAsync(Number(req.params.id));
    
    const category = await prisma.category.findUnique({ where: { id } });

    if (!category)
        return res.status(404).send("Category not found.");

    return res.json(category);
};

export const getCategories = async (req: Request, res: Response): Promise<any> => {
    const { o: offset, l: limit, s: search } = req.query;
    const pagination = await paginationSchema.parseAsync({ offset: Number(offset) || 0, limit: Number(limit) || 10, search });

    const categories = await prisma.category.findMany({
        skip: pagination.limit * pagination.offset,
        take: pagination.limit,
        where: {
            name: { contains: pagination.search }
        }
    });

    return res.json(categories);
};
  
  