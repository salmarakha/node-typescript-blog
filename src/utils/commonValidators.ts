import { z } from "zod"; 

export const paginationSchema = z.object({
    offset: z.number().int(),
    limit: z.number().int(),
    search: z.string().min(1).max(255).optional(),
});

export const idSchema = z.number().int().min(0);