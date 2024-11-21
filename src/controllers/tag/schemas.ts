import { z } from "zod"; 

export const tagSchema = z.object({
    name: z.string().max(255, "Name exceeded max length"),
});

