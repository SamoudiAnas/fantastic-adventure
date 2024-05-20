import { z } from "zod";

const partSchema = z.object({
  id: z.string(),
  partDesignation: z.string(),
  partUnit: z.string(),
  partType: z.string(),
  price: z.number(),
  quantity: z.number(),
  receptionDate: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type Part = z.infer<typeof partSchema>;

export { partSchema, type Part };
