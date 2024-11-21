import { z } from "zod"; 

export const postSchema = z.object({
    title: z.string().max(255, "Name exceeded 255 character"),
    content: z.string().max(2000, "Content exceeded 2000 character"),
    categoryId: z.number().int().min(1),
    tagIds: z.array(z.number().int().min(1))
});

