import { z } from "zod"; 

export const categorySchema = z.object({
    name: z.string().max(255, "Name exceeded max length"),
});

